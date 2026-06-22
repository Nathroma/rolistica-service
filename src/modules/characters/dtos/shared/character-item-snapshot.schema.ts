import { mongoIdSchema } from '@/modules/schemas/mongo-id.schema';
import { z } from 'zod';

export const characterItemSnapshotSchema = z
    .object({
        _id: mongoIdSchema.meta({ description: 'Snapshot ID in character inventory' }),
        sourceItemId: mongoIdSchema.optional().meta({ description: 'Catalog item ID' }),
        name: z.string().meta({ description: 'Item name', examples: 'Longsword' }),
        description: z.string().optional().meta({ description: 'Item description' }),
        quantity: z.number().meta({ description: 'Quantity', examples: 1 }),
        weight: z.number().meta({ description: 'Weight', examples: 3 }),
        type: z.string().meta({ description: 'Item type', examples: 'weapon' }),
        damage: z.string().optional().meta({ description: 'Damage dice', examples: '1d8' }),
        armorClass: z.number().optional().meta({ description: 'Armor class', examples: 16 }),
    })
    .meta({ id: 'CharacterItemSnapshot', title: 'Character item snapshot' });
