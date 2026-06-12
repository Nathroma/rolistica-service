import { BadRequestException } from '@nestjs/common';
import { createZodValidationPipe } from 'nestjs-zod';
import { fromError } from 'zod-validation-error';

export const ZodValidationPipe = createZodValidationPipe({
    createValidationException: (error) => new BadRequestException(fromError(error, { prefix: null }).message),
});
