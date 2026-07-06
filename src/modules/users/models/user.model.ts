import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Exclude()
@Schema({
    timestamps: true,
    collection: 'users',
})
export class User {
    @Expose()
    @Prop({ required: true, unique: true, lowercase: true, trim: true, type: String })
    email: string;

    @Prop({ required: true, type: String, select: false })
    passwordHash: string;

    @Prop({ required: false, type: String, select: false })
    refreshTokenHash?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
