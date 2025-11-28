import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform<string, Types.ObjectId> {
    transform(id: string): Types.ObjectId {
        if (!id) {
            throw new BadRequestException();
        }

        const validObjectId = Types.ObjectId.isValid(id);
        if (!validObjectId) {
            throw new BadRequestException();
        }

        return Types.ObjectId.createFromHexString(id);
    }
}
