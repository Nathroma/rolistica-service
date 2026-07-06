import { User, UserDocument } from '@/modules/users/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email.toLowerCase() });
    }

    async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email.toLowerCase() }).select('+passwordHash +refreshTokenHash');
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id);
    }

    async create(email: string, passwordHash: string): Promise<UserDocument> {
        const user = new this.userModel({ email: email.toLowerCase(), passwordHash });
        return user.save();
    }

    async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void> {
        await this.userModel.findByIdAndUpdate(userId, { refreshTokenHash });
    }

    async findByIdWithRefreshToken(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).select('+refreshTokenHash');
    }
}
