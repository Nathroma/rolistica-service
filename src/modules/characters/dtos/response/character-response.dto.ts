import { characterItemSnapshotSchema } from '@/modules/characters/dtos/shared/character-item-snapshot.schema';
import { characterSpellSnapshotSchema } from '@/modules/characters/dtos/shared/character-spell-snapshot.schema';
import { characterStatsSchema } from '@/modules/characters/dtos/shared/character-stats.schema';
import { noteResponseSchema } from '@/modules/notes/dto/response/note-response.dto';
import { createZodDto, type ZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const characterResponseSchema = z
    .object({
        _id: z.string().meta({ description: 'MongoDB ID' }),
        name: z.string().meta({ description: 'Character name', examples: 'Tav' }),
        level: z.number().meta({ description: 'Character level', examples: 5 }),
        stats: characterStatsSchema,
        items: z.array(characterItemSnapshotSchema).optional().meta({ description: 'Inventory item snapshots' }),
        spells: z.array(characterSpellSnapshotSchema).optional().meta({ description: 'Known spell snapshots' }),
        notes: z.array(noteResponseSchema).optional().meta({ description: 'Character notes' }),
        gameSystem: z.string().meta({ description: 'Game system', examples: 'D&D 5e' }),
        createdAt: z.string().meta({ description: 'Creation date' }),
        updatedAt: z.string().meta({ description: 'Last modification date' }),
    })
    .meta({ id: 'Character', title: 'Character' });

export const characterInfosResponseSchema = z
    .object({
        _id: z.string(),
        name: z.string().meta({ description: 'Character name', examples: 'Tav' }),
        level: z.number().meta({ description: 'Character level', examples: 5 }),
        gameSystem: z.string().meta({ description: 'Game system', examples: 'D&D 5e' }),
        collectionName: z.string().meta({ description: 'Collection name' }),
        createdAt: z.string().meta({ description: 'Creation date' }),
        updatedAt: z.string().meta({ description: 'Last modification date' }),
    })
    .meta({ id: 'CharacterInfos', title: 'Character infos' });

const CharacterResponseDtoBase: ZodDto<typeof characterResponseSchema> = createZodDto(characterResponseSchema);

export class CharacterResponseDto extends CharacterResponseDtoBase {}

const CharacterInfosResponseDtoBase: ZodDto<typeof characterInfosResponseSchema> =
    createZodDto(characterInfosResponseSchema);

export class CharacterInfosResponseDto extends CharacterInfosResponseDtoBase {}
