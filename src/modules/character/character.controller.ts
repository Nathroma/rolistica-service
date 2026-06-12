import { CreateCharacterDto } from '@/modules/character/dtos/request/create-character.dto';
import { UpdateCharacterDto } from '@/modules/character/dtos/request/update-character.dto';
import { CharacterResponseDto } from '@/modules/character/dtos/response/character-response.dto';
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
        summary: 'Récupérer un personnage',
        description: 'Retourne un personnage par son identifiant MongoDB.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async getCharacter(@Param() params: MongoIdParamDto) {
        return this.characterService.getCharacter(params.id);
    }

    @Version('1')
    @Post()
    @ApiOperation({
        summary: 'Créer un personnage',
        description: 'Crée un nouveau personnage avec ses statistiques de base.',
    })
    @ApiCreatedResponse({ type: CharacterResponseDto.Output })
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
        return this.characterService.createCharacter(createCharacterDto);
    }

    @Version('1')
    @Put(':id')
    @ApiOperation({
        summary: 'Mettre à jour un personnage',
        description: 'Met à jour partiellement un personnage existant.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async updateCharacter(@Param() params: MongoIdParamDto, @Body() updateCharacterDto: UpdateCharacterDto) {
        return this.characterService.updateCharacter(params.id, updateCharacterDto);
    }

    @Version('1')
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Supprimer un personnage',
        description: 'Supprime définitivement un personnage.',
    })
    @ApiNoContentResponse({ description: 'Personnage supprimé avec succès' })
    async deleteCharacter(@Param() params: MongoIdParamDto): Promise<void> {
        return this.characterService.deleteCharacter(params.id);
    }
}
