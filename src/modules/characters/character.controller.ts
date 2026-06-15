import { CreateCharacterDto } from '@/modules/characters/dtos/request/create-character.dto';
import { UpdateCharacterDto } from '@/modules/characters/dtos/request/update-character.dto';
import { CharacterResponseDto } from '@/modules/characters/dtos/response/character-response.dto';
import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Version } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';

@ApiTags('characters')
@Controller('/characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Version('1')
    @Get(':id')
    @ApiOperation({
        summary: 'Get a character',
        description: 'Get a charatcer by the Mongo ID',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async getCharacter(@Param() params: MongoIdParamDto) {
        return this.characterService.getCharacter(params.id);
    }

    @Version('1')
    @Post()
    @ApiOperation({
        summary: 'Create a character',
        description: 'Create a new character with its base statistics.',
    })
    @ApiCreatedResponse({ type: CharacterResponseDto.Output })
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.characterService.createCharacter(createCharacterDto);
    }

    @Version('1')
    @Put(':id')
    @ApiOperation({
        summary: 'Update a character',
        description: 'Update a existing character partially.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async updateCharacter(@Param() params: MongoIdParamDto, @Body() updateCharacterDto: UpdateCharacterDto) {
        return this.characterService.updateCharacter(params.id, updateCharacterDto);
    }

    @Version('1')
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a character',
        description: 'Delete a character definitively.',
    })
    @ApiNoContentResponse({ description: 'Character deleted successfully' })
    async deleteCharacter(@Param() params: MongoIdParamDto): Promise<void> {
        return this.characterService.deleteCharacter(params.id);
    }
}
