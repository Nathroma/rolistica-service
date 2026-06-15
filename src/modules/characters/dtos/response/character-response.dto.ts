import { characterStatsSchema } from '@/modules/characters/dtos/shared/character-stats.schema';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const characterResponseSchema = z
    .object({
        _id: z.string().meta({ description: 'MongoDB ID' }),
        name: z.string().meta({ description: 'Character name', examples: ['Aragorn'] }),
        level: z.number().meta({ description: 'Character level', examples: [5] }),
        stats: characterStatsSchema,
        gameSystem: z.string().meta({ description: 'Game system', examples: ['D&D 5e'] }),
        createdAt: z.string().meta({ description: 'Creation date' }),
        updatedAt: z.string().meta({ description: 'Last modification date' }),
    })
    .meta({ id: 'Character', title: 'Character' });

export class CharacterResponseDto extends createZodDto(characterResponseSchema) {}
