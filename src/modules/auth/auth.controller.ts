import { AuthService } from '@/modules/auth/auth.service';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Public } from '@/modules/auth/decorators/public.decorator';
import { LoginDto } from '@/modules/auth/dtos/request/login.dto';
import { RefreshTokenDto } from '@/modules/auth/dtos/request/refresh-token.dto';
import { RegisterDto } from '@/modules/auth/dtos/request/register.dto';
import { AuthResponseDto } from '@/modules/auth/dtos/response/auth-response.dto';
import { UserResponseDto } from '@/modules/auth/dtos/response/user-response.dto';
import { AuthUser } from '@/modules/auth/types/auth-user.type';
import { UserService } from '@/modules/users/user.service';
import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Public()
    @Version('1')
    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description: 'Create an account and receive access and refresh tokens.',
    })
    @ApiCreatedResponse({ type: AuthResponseDto })
    async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
        return this.authService.register(registerDto.email, registerDto.password);
    }

    @Public()
    @Version('1')
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Login',
        description: 'Authenticate with email and password to receive tokens.',
    })
    @ApiOkResponse({ type: AuthResponseDto })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Public()
    @Version('1')
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Refresh access token',
        description: 'Exchange a valid refresh token for a new token pair.',
    })
    @ApiOkResponse({ type: AuthResponseDto })
    async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
        return this.authService.refresh(refreshTokenDto.refreshToken);
    }

    @Version('1')
    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Logout',
        description: 'Invalidate the current refresh token server-side.',
    })
    @ApiNoContentResponse({ description: 'Logged out successfully' })
    async logout(@CurrentUser() user: AuthUser): Promise<void> {
        return this.authService.logout(user.userId);
    }

    @Version('1')
    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get current user profile',
        description: 'Return the authenticated user profile.',
    })
    @ApiOkResponse({ type: UserResponseDto })
    async getProfile(@CurrentUser() user: AuthUser) {
        const profile = await this.userService.findById(user.userId);
        if (!profile) {
            throw new NotFoundException('User not found');
        }

        return profile;
    }
}
