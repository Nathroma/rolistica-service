import { mongoIdSchema } from '@/modules/schemas/mongo-id.schema';
import { createZodDto, ZodDto } from 'nestjs-zod';
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

const CharacterNoteParamDtoBase: ZodDto<typeof characterNoteParamSchema> = createZodDto(characterNoteParamSchema);

export class CharacterNoteParamDto extends CharacterNoteParamDtoBase {}
