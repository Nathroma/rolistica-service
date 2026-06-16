import { CreateCharacterDto } from '@/modules/characters/dtos/request/create-character.dto';
import { UpdateCharacterDto } from '@/modules/characters/dtos/request/update-character.dto';
import { Character, CharacterDocument } from '@/modules/characters/models/character.model';
import { Item, ItemDocument } from '@/modules/items/models/item.model';
import { MongoId } from '@/modules/schemas/mongo-id.schema';
import { Spell, SpellDocument } from '@/modules/spells/models/spell.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        @InjectModel(Spell.name) private spellModel: Model<SpellDocument>,
    ) {}

    async getCharacter(id: MongoId): Promise<Character> {
        const character = await this.characterModel.findById(id);
        if (!character) {
            throw new NotFoundException('Character not found, Verify the ID');
        }
        return character;
    }

    async createCharacter(createCharacterDto: CreateCharacterDto): Promise<Character> {
        const character = new this.characterModel(createCharacterDto);
        return await character.save();
    }

    async updateCharacter(id: MongoId, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
        const character = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true });
        if (!character) {
            throw new NotFoundException();
        }
        return character;
    }

    async deleteCharacter(id: MongoId): Promise<void> {
        const character = await this.characterModel.findById(id);
        if (!character) {
            throw new NotFoundException();
        }
        await character.deleteOne();
    }

    async addItemToCharacter(characterId: MongoId, catalogItemId: MongoId): Promise<Character> {
        const item = await this.itemModel.findById(catalogItemId);
        if (!item) {
            throw new NotFoundException();
        }

        const snapshot = {
            _id: new Types.ObjectId(),
            sourceItemId: item.id,
            name: item.name,
            description: item.description,
            quantity: 1,
            weight: item.weight,
            type: item.type,
            damage: item.damage,
            armorClass: item.armorClass,
        };

        const character = await this.characterModel.findByIdAndUpdate(
            characterId,
            { $push: { items: snapshot } },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        return character;
    }

    async removeItemFromCharacter(characterId: MongoId, snapshotId: MongoId): Promise<Character> {
        const character = await this.characterModel.findOneAndUpdate(
            { _id: characterId, 'items._id': snapshotId },
            { $pull: { items: { _id: snapshotId } } },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        return character;
    }

    async addSpellToCharacter(characterId: MongoId, catalogSpellId: MongoId): Promise<Character> {
        const spell = await this.spellModel.findById(catalogSpellId);
        if (!spell) {
            throw new NotFoundException();
        }

        const snapshot = {
            _id: new Types.ObjectId(),
            sourceSpellId: spell.id,
            name: spell.name,
            description: spell.description,
            level: spell.level,
            school: spell.school,
            castingTime: spell.castingTime,
            range: spell.range,
            duration: spell.duration,
            concentration: spell.concentration,
            ritual: spell.ritual,
            components: spell.components,
        };

        const character = await this.characterModel.findByIdAndUpdate(
            characterId,
            { $push: { spells: snapshot } },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        return character;
    }

    async removeSpellFromCharacter(characterId: MongoId, snapshotId: MongoId): Promise<Character> {
        const character = await this.characterModel.findOneAndUpdate(
            { _id: characterId, 'spells._id': snapshotId },
            { $pull: { spells: { _id: snapshotId } } },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        return character;
    }
}
