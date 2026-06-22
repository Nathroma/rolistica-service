import { ItemAction, ItemType } from '@/types/item';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const itemResponseSchema = z
    .object({
        _id: z.string().meta({ description: 'MongoDB ID' }),
        name: z.string().meta({ description: 'Item name', examples: 'Sword' }),
        description: z.string().meta({
            description: 'Item description',
            examples: 'A sharp sword with 1d8 damage and +1 to attack',
        }),
        type: z.enum(ItemType).meta({ description: 'Item type', examples: ItemType.weapon }),
        action: z.enum(ItemAction).meta({ description: 'Item action', examples: ItemAction.action }),
        weight: z.number().meta({ description: 'Item weight', examples: 1 }),
        value: z.number().meta({ description: 'Item value', examples: 10 }),
        damage: z.string().meta({ description: 'Item damage', examples: '1d8' }),
        range: z.number().meta({ description: 'Item range', examples: 3 }),
        weaponProperties: z.array(z.string()).meta({ description: 'Item weapon properties', examples: 'finesse' }),
        armorClass: z.number().meta({ description: 'Item armor class', examples: 16 }),
        armorType: z.string().meta({ description: 'Item armor type', examples: 'light' }),
        stealthDisadvantage: z.boolean().meta({ description: 'Item stealth disadvantage', examples: false }),
    })
    .meta({ id: 'Item', title: 'Item' });

export class ItemResponseDto extends createZodDto(itemResponseSchema) {}
