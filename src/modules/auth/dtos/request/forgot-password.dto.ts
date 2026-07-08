import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const forgotPasswordSchema = z
    .object({
        email: z.email().meta({ description: 'Account email address', examples: 'player@example.com' }),
    })
    .meta({ id: 'ForgotPassword', title: 'Request a password reset' });

export class ForgotPasswordDto extends createZodDto(forgotPasswordSchema) {}
