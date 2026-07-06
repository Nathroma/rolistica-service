import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const loginSchema = z
    .object({
        email: z.email().meta({ description: 'User email address', examples: 'player@example.com' }),
        password: z.string().meta({ description: 'User password', examples: 'mySecurePassword' }),
    })
    .meta({ id: 'Login', title: 'Login' });

export class LoginDto extends createZodDto(loginSchema) {}
