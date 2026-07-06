import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const authResponseSchema = z
    .object({
        accessToken: z.string().meta({ description: 'Short-lived JWT access token' }),
        refreshToken: z.string().meta({ description: 'Long-lived refresh token' }),
    })
    .meta({ id: 'AuthResponse', title: 'Authentication response' });

export class AuthResponseDto extends createZodDto(authResponseSchema) {}
