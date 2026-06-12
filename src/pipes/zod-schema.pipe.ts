import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { fromError } from 'zod-validation-error';

/** @deprecated Use createZodDto + global ZodValidationPipe from nestjs-zod instead */
export class ZodSchemaPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown, _metadata: ArgumentMetadata) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            const parsedError = fromError(error, { prefix: null });
            throw new BadRequestException(parsedError.message);
        }
    }
}
