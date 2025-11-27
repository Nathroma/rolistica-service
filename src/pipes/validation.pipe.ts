import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform<string, Types.ObjectId> {
    transform(id: string): Types.ObjectId {
        if (!id) {
            throw new BadRequestException('ID is required');
        }

        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new BadRequestException('Invalid ID');
        }

        return Types.ObjectId.createFromHexString(id);
    }
}
