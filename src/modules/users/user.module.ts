import { User, UserSchema } from '@/modules/users/models/user.model';
import { UserService } from '@/modules/users/user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
