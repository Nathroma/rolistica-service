import { UpdateCharacterDto } from '@/modules/character/dto/update-character.dto';
import { Character } from '@/modules/character/entities/character.entity';
import { updateCharacterSchema } from '@/modules/character/schemas/update-character.schema';
import { mongoIdSchema } from '@/modules/schemas/mongo-id.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, Version } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { createCharacterSchema } from './schemas/create-character.schema';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Version('1')
  @Get(':id')
  @UsePipes(new ZodValidationPipe(mongoIdSchema))
  async getCharacter(@Param('id') id: string): Promise<Character> {
    return this.characterService.getCharacter(id);
  }

  @Version('1')
  @Post()
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  async createCharacter(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.characterService.createCharacter(createCharacterDto);
  }

  @Version('1')
  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateCharacterSchema))
  async updateCharacter(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    return this.characterService.updateCharacter(id, updateCharacterDto);
  }

  @Version('1')
  @Delete(':id')
  @UsePipes(new ZodValidationPipe(mongoIdSchema))
  async deleteCharacter(@Param('id') id: string): Promise<void> {
    return this.characterService.deleteCharacter(id);
  }
}
