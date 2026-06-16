import { Character, CharacterSchema } from '@/modules/characters/models/character.model';
import { Item, ItemSchema } from '@/modules/items/models/item.model';
import { Spell, SpellSchema } from '@/modules/spells/models/spell.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Character.name, schema: CharacterSchema },
            { name: Item.name, schema: ItemSchema },
            { name: Spell.name, schema: SpellSchema },
        ]),
    ],
    controllers: [CharacterController],
    providers: [CharacterService],
    exports: [CharacterService],
})
export class CharacterModule {}
