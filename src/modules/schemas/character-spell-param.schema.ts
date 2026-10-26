import { createZodDto, ZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { mongoIdSchema } from './mongo-id.schema';

export const characterSpellParamSchema = z
    .object({
        id: mongoIdSchema.meta({
            description: 'Identifiant MongoDB du personnage',
        }),
        spellId: mongoIdSchema.meta({
            description: 'Identifiant MongoDB du Spell',
        }),
    })
    .meta({ id: 'CharacterSpellParam' });

const CharacterSpellParamDtoBase: ZodDto<typeof characterSpellParamSchema> = createZodDto(characterSpellParamSchema);

export class CharacterSpellParamDto extends CharacterSpellParamDtoBase {}
