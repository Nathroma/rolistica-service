import { SpellType } from '@/types/spell';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateSpellSchema = z
    .object({
        name: z.string().meta({ description: 'Spell name', examples: 'Magic Missile' }),
        description: z
            .string()
            .meta({ description: 'Spell description', examples: 'Launches 3 missiles of magic energy at a target' }),
        type: z.enum(SpellType).meta({ description: 'Spell type', examples: SpellType.cantrip }),
        level: z.number().meta({ description: 'Spell level', examples: 1 }),
        school: z.string().meta({ description: 'Spell school', examples: 'Evocation' }),
        castingTime: z.string().meta({ description: 'Spell casting time', examples: '1 action' }),
        range: z.string().meta({ description: 'Spell range', examples: '120 feet' }),
        duration: z.string().meta({ description: 'Spell duration', examples: 'Instantaneous' }),
        concentration: z.boolean().meta({ description: 'Spell concentration', examples: false }),
        ritual: z.boolean().meta({ description: 'Spell ritual', examples: false }),
    })
    .meta({ id: 'UpdateSpell', title: 'Update a spell' });

export class UpdateSpellDto extends createZodDto(updateSpellSchema) {}
