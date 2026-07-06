import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const registerSchema = z
    .object({
        email: z.email().meta({ description: 'User email address', examples: 'player@example.com' }),
        password: z
            .string()
            .min(8)
            .meta({ description: 'Password (minimum 8 characters)', examples: 'mySecurePassword' }),
    })
    .meta({ id: 'Register', title: 'Register a new user' });

export class RegisterDto extends createZodDto(registerSchema) {}
