import { ItemAction, ItemType } from '@/types/item';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateItemSchema = z
    .object({
        name: z
            .string()
            .optional()
            .meta({ description: 'Item name', examples: ['Sword'] }),
        quantity: z
            .number()
            .optional()
            .meta({ description: 'Item quantity', examples: [1] }),
        description: z
            .string()
            .optional()
            .meta({ description: 'Item description', examples: ['A sharp sword with 1d8 damage and +1 to attack'] }),
        type: z
            .enum(ItemType)
            .optional()
            .meta({ description: 'Item type', examples: [ItemType.weapon] }),
        weight: z
            .number()
            .optional()
            .meta({ description: 'Item weight', examples: [1] }),
        value: z
            .number()
            .optional()
            .meta({ description: 'Item value', examples: [10] }),
        action: z
            .enum(ItemAction)
            .optional()
            .meta({ description: 'Item action', examples: [ItemAction.action] }),
    })
    .meta({ id: 'UpdateItem', title: 'Update an item' });

export class UpdateItemDto extends createZodDto(updateItemSchema) {}
