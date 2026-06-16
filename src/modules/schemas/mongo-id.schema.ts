import { Types } from 'mongoose';
import { z } from 'zod';

export const mongoIdSchema = z.string().refine((id) => Types.ObjectId.isValid(id), { message: 'Invalid ID' });

export type MongoId = z.infer<typeof mongoIdSchema>;
