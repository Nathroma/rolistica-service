import { parsedEnv } from '@/config/env';
import { AuthResponseDto } from '@/modules/auth/dtos/response/auth-response.dto';
import { MessageResponseDto } from '@/modules/auth/dtos/response/message-response.dto';
import { JwtPayload } from '@/modules/auth/types/jwt-payload.type';
import { MailService } from '@/modules/mail/mail.service';
import { UserService } from '@/modules/users/user.service';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const BCRYPT_ROUNDS = 12;
const RESET_PASSWORD_EXPIRES_IN_MS = 15 * 60 * 1000;
const FORGOT_PASSWORD_MESSAGE = 'If an account exists for this email, a password reset link has been sent.';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async register(email: string, password: string): Promise<AuthResponseDto> {
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
        const user = await this.userService.create(email, passwordHash);

        return this.issueTokens(user.id, user.email);
    }

    async login(email: string, password: string): Promise<AuthResponseDto> {
        const user = await this.userService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.issueTokens(user.id, user.email);
    }

    async refresh(refreshToken: string): Promise<AuthResponseDto> {
        let payload: JwtPayload;

        try {
            payload = this.jwtService.verify<JwtPayload>(refreshToken, {
                secret: parsedEnv.JWT_REFRESH_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.userService.findByIdWithRefreshToken(payload.sub);
        if (!user?.refreshTokenHash) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        return this.issueTokens(user.id, user.email);
    }

    async logout(userId: string): Promise<void> {
        await this.userService.updateRefreshTokenHash(userId, null);
    }

    async forgotPassword(email: string): Promise<MessageResponseDto> {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const resetToken = randomBytes(32).toString('hex');
            const resetPasswordTokenHash = await bcrypt.hash(resetToken, BCRYPT_ROUNDS);
            const resetPasswordExpiresAt = new Date(Date.now() + RESET_PASSWORD_EXPIRES_IN_MS);

            await this.userService.setResetPasswordToken(user.id, resetPasswordTokenHash, resetPasswordExpiresAt);

            const resetUrl = `${parsedEnv.FRONTEND_URL}/reset-password?email=${encodeURIComponent(user.email)}&token=${resetToken}`;

            await this.mailService.sendPasswordResetEmail(user.email, resetUrl);
        }

        return { message: FORGOT_PASSWORD_MESSAGE };
    }

    async resetPassword(email: string, token: string, newPassword: string): Promise<MessageResponseDto> {
        const user = await this.userService.findByEmailWithResetToken(email);

        if (!user?.resetPasswordTokenHash || !user.resetPasswordExpiresAt) {
            throw new BadRequestException('Invalid or expired reset token');
        }

        if (user.resetPasswordExpiresAt.getTime() < Date.now()) {
            await this.userService.clearResetPasswordToken(user.id);
            throw new BadRequestException('Invalid or expired reset token');
        }

        const isTokenValid = await bcrypt.compare(token, user.resetPasswordTokenHash);
        if (!isTokenValid) {
            throw new BadRequestException('Invalid or expired reset token');
        }

        const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

        await this.userService.updatePassword(user.id, passwordHash);
        await this.userService.clearResetPasswordToken(user.id);
        await this.userService.updateRefreshTokenHash(user.id, null);

        return { message: 'Password has been reset successfully' };
    }

    private async issueTokens(userId: string, email: string): Promise<AuthResponseDto> {
        const payload: JwtPayload = { sub: userId, email };

        const accessToken = this.jwtService.sign(payload, {
            secret: parsedEnv.JWT_SECRET,
            expiresIn: parsedEnv.ACCESS_TOKEN_EXPIRATION_TIME,
        } as JwtSignOptions);

        const refreshToken = this.jwtService.sign(payload, {
            secret: parsedEnv.JWT_REFRESH_SECRET,
            expiresIn: parsedEnv.REFRESH_TOKEN_EXPIRATION_TIME,
        } as JwtSignOptions);

        const refreshTokenHash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
        await this.userService.updateRefreshTokenHash(userId, refreshTokenHash);

        return { accessToken, refreshToken };
    }
}
