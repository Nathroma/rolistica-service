import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const resetPasswordSchema = z
    .object({
        email: z.email().meta({ description: 'Account email address', examples: 'player@example.com' }),
        token: z.string().min(1).meta({ description: 'Reset token received by email' }),
        newPassword: z
            .string()
            .min(8)
            .meta({ description: 'New password (minimum 8 characters)', examples: 'myNewSecurePassword' }),
    })
    .meta({ id: 'ResetPassword', title: 'Reset password with token' });

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
