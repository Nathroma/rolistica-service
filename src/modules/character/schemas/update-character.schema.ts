import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { characterStatsSchema } from './character-stats.schema';

export const updateCharacterSchema = z
    .object({
        name: z
            .string()
            .optional()
            .meta({ description: 'Character name', examples: ['Aragorn'] }),
        gameSystem: z
            .string()
            .optional()
            .meta({ description: 'Game system', examples: ['D&D 5e'] }),
        level: z
            .number()
            .min(1)
            .max(20)
            .optional()
            .meta({ description: 'Character level', examples: [5] }),
        stats: characterStatsSchema.optional(),
    })
    .meta({ id: 'UpdateCharacter', title: 'Update a character' });

export class UpdateCharacterDto extends createZodDto(updateCharacterSchema) {}
