import { ItemAction, ItemType } from '@/types/item';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createItemSchema = z
    .object({
        name: z.string().meta({ description: 'Item name', examples: ['Sword'] }),
        quantity: z.number().meta({ description: 'Item quantity', examples: [1] }),
        description: z
            .string()
            .optional()
            .meta({ description: 'Item description', examples: ['A sharp sword with 1d8 damage and +1 to attack'] }),
        type: z.enum(ItemType).meta({ description: 'Item type', examples: [ItemType.weapon] }),
        weight: z.number().meta({ description: 'Item weight', examples: [1] }),
        value: z.number().meta({ description: 'Item value', examples: [10] }),
        action: z.enum(ItemAction).meta({ description: 'Item action', examples: [ItemAction.action] }),
    })
    .meta({ id: 'CreateItem', title: 'Create an item' });

export class CreateItemDto extends createZodDto(createItemSchema) {}
