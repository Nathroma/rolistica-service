import { UpdateCharacterDto } from '@/modules/character/dto/update-character.dto';
import { Character } from '@/modules/character/schemas/character.schema';
import { IdValidationPipe } from '@/pipes/validation.pipe';
import { Body, Controller, Delete, Get, Param, Post, Put, Version } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Version('1')
  @Get('/:id')
  async getCharacter(@Param('id', IdValidationPipe) id: string): Promise<Character> {
    return this.characterService.getCharacter(id);
  }

  @Version('1')
  @Post()
  async createCharacter(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.characterService.createCharacter(createCharacterDto);
  }

  @Version('1')
  @Put(':id')
  async updateCharacter(@Param('id', IdValidationPipe) id: string, @Body() updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    return this.characterService.updateCharacter(id, updateCharacterDto);
  }

  @Version('1')
  @Delete(':id')
  async deleteCharacter(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.characterService.deleteCharacter(id);
  }
}
