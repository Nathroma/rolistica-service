import { ItemAction, ItemType } from "@/types/item";
import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  description: z.string().optional(),
  type: z.enum(ItemType),
  weight: z.number(),
  value: z.number(),
  action: z.enum(ItemAction),
}).required();

export type CreateItemSchema = z.infer<typeof createItemSchema>;