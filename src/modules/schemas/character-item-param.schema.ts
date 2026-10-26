import { createZodDto, type ZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { mongoIdSchema } from './mongo-id.schema';

export const characterItemParamSchema = z
    .object({
        id: mongoIdSchema.meta({
            description: 'Identifiant MongoDB du personnage',
        }),
        itemId: mongoIdSchema.meta({
            description: "Identifiant MongoDB de l'item",
        }),
    })
    .meta({ id: 'CharacterItemParam' });

const CharacterItemParamDtoBase: ZodDto<typeof characterItemParamSchema> =
    createZodDto(characterItemParamSchema);

export class CharacterItemParamDto extends CharacterItemParamDtoBase {}
