import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const refreshTokenSchema = z
    .object({
        refreshToken: z.string().meta({ description: 'Refresh token received at login or register' }),
    })
    .meta({ id: 'RefreshToken', title: 'Refresh access token' });

export class RefreshTokenDto extends createZodDto(refreshTokenSchema) {}
