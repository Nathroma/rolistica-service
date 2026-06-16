import { CreateCharacterDto } from '@/modules/characters/dtos/request/create-character.dto';
import { UpdateCharacterDto } from '@/modules/characters/dtos/request/update-character.dto';
import { Character, CharacterDocument } from '@/modules/characters/models/character.model';
import { Item, ItemDocument } from '@/modules/items/models/item.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    ) {}

    async getCharacter(id: string): Promise<Character> {
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

    async updateCharacter(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
        const character = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true });
        if (!character) {
            throw new NotFoundException();
        }
        return character;
    }

    async deleteCharacter(id: string): Promise<void> {
        const character = await this.characterModel.findById(id);
        if (!character) {
            throw new NotFoundException();
        }
        await character.deleteOne();
    }

    async addItemToCharacter(characterId: string, itemId: string): Promise<Character> {
        const item = await this.itemModel.findById(itemId);
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
            { $push: { inventory: snapshot } },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        return character;
    }

    async removeItemFromCharacter(characterId: string, itemSnapshotId: string): Promise<Character> {
        const character = await this.characterModel.findById(characterId);
        if (!character) {
            throw new NotFoundException();
        }

        const itemSnapshot = character.items.find((item: any) => item._id.toString() === itemSnapshotId.toString());
        if (!itemSnapshot) {
            throw new NotFoundException();
        }

        character.items = character.items.filter((item) => item._id.toString() !== itemSnapshotId.toString());
        return await character.save();
    }
}
