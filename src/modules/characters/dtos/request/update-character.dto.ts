import { partialCharacterStatsSchema } from '@/modules/characters/dtos/shared/character-stats.schema';
import { createZodDto, ZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateCharacterSchema = z
    .object({
        name: z.string().optional().meta({ description: 'Character name', examples: 'Aragorn' }),
        gameSystem: z.string().optional().meta({ description: 'Game system', examples: 'D&D 5e' }),
        level: z.number().min(1).max(20).optional().meta({ description: 'Character level', examples: 5 }),
        stats: partialCharacterStatsSchema.optional(),
    })
    .meta({ id: 'UpdateCharacter', title: 'Update a character' });

const UpdateCharacterDtoBase: ZodDto<typeof updateCharacterSchema> = createZodDto(updateCharacterSchema);

export class UpdateCharacterDto extends UpdateCharacterDtoBase {}
