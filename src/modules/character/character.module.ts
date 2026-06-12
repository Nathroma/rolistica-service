import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character, CharacterSchema } from './entities/character.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
    controllers: [CharacterController],
    providers: [CharacterService],
    exports: [CharacterService], // Export pour utilisation dans d'autres modules si nécessaire
})
export class CharacterModule {}
