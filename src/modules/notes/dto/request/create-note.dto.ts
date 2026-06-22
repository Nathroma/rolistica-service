import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const createNoteSchema = z
    .object({
        title: z.string().meta({ description: 'Note title', examples: 'My first note' }),
        content: z.string().meta({ description: 'Note content', examples: 'This is my first note' }),
    })
    .meta({ id: 'CreateNote', title: 'Create a note' });

export class CreateNoteDto extends createZodDto(createNoteSchema) {}
