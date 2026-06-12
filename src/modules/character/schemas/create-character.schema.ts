import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { characterStatsSchema } from './character-stats.schema';

export const createCharacterSchema = z
    .object({
        name: z.string().meta({ description: 'Character name', examples: ['Aragorn'] }),
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
        stats: characterStatsSchema,
    })
    .meta({ id: 'CreateCharacter', title: 'Create a character' });

export class CreateCharacterDto extends createZodDto(createCharacterSchema) {}
