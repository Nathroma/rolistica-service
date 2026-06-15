import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const noteResponseSchema = z
    .object({
        _id: z.string().meta({ description: 'MongoDB ID' }),
        title: z.string().meta({ description: 'Note title', examples: ['My first note'] }),
        content: z.string().meta({ description: 'Note content', examples: ['This is my first note'] }),
    })
    .meta({ id: 'Note', title: 'Note' });

export class NoteResponseDto extends createZodDto(noteResponseSchema) {}
