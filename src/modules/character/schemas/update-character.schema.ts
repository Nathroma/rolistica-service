import { z } from 'zod';

export const updateCharacterSchema = z
  .object({
    name: z.string().optional(),
    level: z.number().min(1).max(20).optional(),
    gameSystem: z.string().optional(),
    stats: z.object({
      strength: z.number().min(1).max(30).optional(),
      dexterity: z.number().min(1).max(30).optional(),
      constitution: z.number().min(1).max(30).optional(),
      intelligence: z.number().min(1).max(30).optional(),
      wisdom: z.number().min(1).max(30).optional(),
      charisma: z.number().min(1).max(30).optional(),
    }).optional(),
  })
  .required();

export type UpdateCharacterSchema = z.infer<typeof updateCharacterSchema>;