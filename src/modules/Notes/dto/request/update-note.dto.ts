import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const updateNoteSchema = z
    .object({
        title: z.string().meta({ description: 'Note title', examples: ['My first note'] }),
        content: z.string().meta({ description: 'Note content', examples: ['This is my first note'] }),
    })
    .meta({ id: 'UpdateNote', title: 'Update a note' });

export class UpdateNoteDto extends createZodDto(updateNoteSchema) {}
