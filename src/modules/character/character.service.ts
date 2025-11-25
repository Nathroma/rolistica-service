import { CreateCharacterDto, UpdateCharacterDto } from '@/modules/character/dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
  ) {}

  async getCharacter(id: string): Promise<Character> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    const character = await this.characterModel.findById(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }
    return character as Character;
  }

  async createCharacter(createCharacterDto: CreateCharacterDto): Promise<Character> {

  }

  async updateCharacter(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {

  }

  async deleteCharacter(id: string): Promise<void> {
    
  }
}
