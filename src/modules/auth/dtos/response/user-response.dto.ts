import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userResponseSchema = z
    .object({
        _id: z.string().meta({ description: 'User MongoDB ID' }),
        email: z.string().meta({ description: 'User email address', examples: 'player@example.com' }),
        createdAt: z.string().meta({ description: 'Account creation date' }),
        updatedAt: z.string().meta({ description: 'Last account update date' }),
    })
    .meta({ id: 'User', title: 'User' });

export class UserResponseDto extends createZodDto(userResponseSchema) {}
