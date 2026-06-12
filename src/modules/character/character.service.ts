import { CreateCharacterDto } from '@/modules/character/dtos/request/create-character.schema';
import { UpdateCharacterDto } from '@/modules/character/dtos/request/update-character.schema';
import { Character, CharacterDocument } from '@/modules/character/models/character.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

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
}
