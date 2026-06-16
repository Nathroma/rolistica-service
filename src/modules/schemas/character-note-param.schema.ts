import { mongoIdSchema } from '@/modules/schemas/mongo-id.schema';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const characterNoteParamSchema = z
    .object({
        id: mongoIdSchema.meta({
            description: 'Identifiant MongoDB du personnage',
        }),
        noteId: mongoIdSchema.meta({
            description: 'Identifiant MongoDB de la note',
        }),
    })
    .meta({ id: 'CharacterNoteParam' });

export class CharacterNoteParamDto extends createZodDto(characterNoteParamSchema) {}
