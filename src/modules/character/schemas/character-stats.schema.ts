import { z } from 'zod';

const statValue = z
    .number()
    .min(1)
    .max(30)
    .meta({ description: 'Stat value', examples: [10] });

export const characterStatsSchema = z
    .object({
        strength: statValue.meta({ description: 'Strength', examples: [10] }),
        dexterity: statValue.meta({ description: 'Dexterity', examples: [10] }),
        constitution: statValue.meta({ description: 'Constitution', examples: [10] }),
        intelligence: statValue.meta({ description: 'Intelligence', examples: [10] }),
        wisdom: statValue.meta({ description: 'Wisdom', examples: [10] }),
        charisma: statValue.meta({ description: 'Charisma', examples: [10] }),
    })
    .meta({ id: 'CharacterStats', title: 'Character stats' });

export const partialCharacterStatsSchema = characterStatsSchema.partial();
