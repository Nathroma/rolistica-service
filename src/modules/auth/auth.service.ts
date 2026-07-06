import { AuthResponseDto } from '@/modules/auth/dtos/response/auth-response.dto';
import { JwtPayload } from '@/modules/auth/types/jwt-payload.type';
import { UserService } from '@/modules/users/user.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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
                secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-me',
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

    private async issueTokens(userId: string, email: string): Promise<AuthResponseDto> {
        const payload: JwtPayload = { sub: userId, email };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'dev-secret-change-me',
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-me',
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        });

        const refreshTokenHash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
        await this.userService.updateRefreshTokenHash(userId, refreshTokenHash);

        return { accessToken, refreshToken };
    }
}
