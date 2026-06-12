import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { mongoIdSchema } from './mongo-id.schema';

export const mongoIdParamSchema = z
    .object({
        id: mongoIdSchema.meta({
            description: 'Identifiant MongoDB',
            examples: ['507f1f77bcf86cd799439011'],
        }),
    })
    .meta({ id: 'MongoIdParam' });

export class MongoIdParamDto extends createZodDto(mongoIdParamSchema) {}
