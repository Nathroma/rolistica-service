import { Controller } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('api/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}
}
