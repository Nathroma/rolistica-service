import { z } from 'zod';

export const createCharacterSchema = z
  .object({
    name: z.string(),
    gameSystem: z.string().optional(),
    level: z.number().min(1).max(20).optional(),
    stats: z.object({
      strength: z.number().min(1).max(30),
      dexterity: z.number().min(1).max(30),
      constitution: z.number().min(1).max(30),
      intelligence: z.number().min(1).max(30),
      wisdom: z.number().min(1).max(30),
      charisma: z.number().min(1).max(30),
    }),
  })
  .required();

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
