import { CreateCharacterDto, UpdateCharacterDto } from '@/modules/character/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
  ) {}

  async getCharacter(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character as Character;
  }

  async createCharacter(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = new this.characterModel(createCharacterDto);
    return await character.save();
  }

  async updateCharacter(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    const character = await this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true });
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character as Character;
  }

  async deleteCharacter(id: string): Promise<void> {
    const character = await this.characterModel.findById(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    await character.deleteOne();
  }
}
