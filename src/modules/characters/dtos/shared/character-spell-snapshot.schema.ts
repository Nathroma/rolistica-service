import { mongoIdSchema } from '@/modules/schemas/mongo-id.schema';
import { z } from 'zod';

export const characterSpellSnapshotSchema = z
    .object({
        _id: mongoIdSchema.meta({ description: 'Snapshot ID in character spell list' }),
        sourceSpellId: mongoIdSchema.optional().meta({ description: 'Catalog spell ID' }),
        name: z.string().meta({ description: 'Spell name', examples: 'Fireball' }),
        description: z.string().optional().meta({ description: 'Spell description' }),
        level: z.number().optional().meta({ description: 'Spell level', examples: 3 }),
        school: z.string().optional().meta({ description: 'Spell school', examples: 'evocation' }),
        castingTime: z.string().optional().meta({ description: 'Casting time', examples: '1 action' }),
        range: z.string().optional().meta({ description: 'Spell range', examples: '150 feet' }),
        duration: z.string().optional().meta({ description: 'Spell duration', examples: 'Instantaneous' }),
        concentration: z.boolean().optional().meta({ description: 'Requires concentration', examples: false }),
        ritual: z.boolean().optional().meta({ description: 'Can be cast as ritual', examples: false }),
        components: z.array(z.string()).optional().meta({ description: 'Spell components', examples: 'V', 'S', 'M' }),
    })
    .meta({ id: 'CharacterSpellSnapshot', title: 'Character spell snapshot' });
