import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const messageResponseSchema = z
    .object({
        message: z.string().meta({ description: 'Informational message' }),
    })
    .meta({ id: 'MessageResponse', title: 'Message response' });

export class MessageResponseDto extends createZodDto(messageResponseSchema) {}
