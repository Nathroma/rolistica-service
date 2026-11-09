import { characterStatsSchema } from '@/modules/characters/dtos/shared/character-stats.schema';
import { createZodDto, ZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCharacterSchema = z
    .object({
        name: z.string().meta({ description: 'Character name', examples: 'Aragorn' }),
        gameSystem: z
            .string()
            .optional()
            .meta({ description: 'Game system', examples: ['D&D 5e', 'Custom'] }),
        level: z.number().min(1).max(30).optional().meta({ description: 'Character level', examples: 5 }),
        stats: characterStatsSchema,
    })
    .meta({ id: 'CreateCharacter', title: 'Create a character' });

const CreateCharacterDtoBase: ZodDto<typeof createCharacterSchema> = createZodDto(createCharacterSchema);

export class CreateCharacterDto extends CreateCharacterDtoBase {}
