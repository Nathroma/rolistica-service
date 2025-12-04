import { ItemAction, ItemType } from "@/types/item";
import { z } from "zod";

export const updateItemSchema = z.object({
  name: z.string().optional(),
  quantity: z.number().optional(),
  description: z.string().optional(),
  type: z.enum(ItemType).optional(),
  weight: z.number().optional(),
  value: z.number().optional(),
  action: z.enum(ItemAction).optional(),
}).required();

export type UpdateItemSchema = z.infer<typeof updateItemSchema>;