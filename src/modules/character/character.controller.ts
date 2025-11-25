import { Character } from '@/modules/character/schemas/character.schema';
import { Controller, Get, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('/v1/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get(':id')
  async getCharacter(@Param('id') id: string): Promise<Character> {
    return this.characterService.getCharacter(id);
  }
  
}
