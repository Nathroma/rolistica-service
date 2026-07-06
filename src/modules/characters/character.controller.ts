import { CreateCharacterDto } from '@/modules/characters/dtos/request/create-character.dto';
import { UpdateCharacterDto } from '@/modules/characters/dtos/request/update-character.dto';
import { CharacterResponseDto } from '@/modules/characters/dtos/response/character-response.dto';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { AuthUser } from '@/modules/auth/types/auth-user.type';
import { CharacterItemParamDto } from '@/modules/schemas/character-item-param.schema';
import { CharacterSpellParamDto } from '@/modules/schemas/character-spell-param.schema';
import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Version } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { CharacterService } from './character.service';

@ApiTags('characters')
@ApiBearerAuth()
@Controller('/characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Version('1')
    @Get()
    @ApiOperation({
        summary: 'Get characters list',
        description: 'Get all characters belonging to the authenticated user.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output, isArray: true })
    async getCharacterList(@CurrentUser() user: AuthUser) {
        return this.characterService.getCharacterList(user.userId);
    }

    @Version('1')
    @Get(':id')
    @ApiOperation({
        summary: 'Get a character',
        description: 'Get a character by Mongo ID. Only accessible if it belongs to the authenticated user.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async getCharacter(@Param() params: MongoIdParamDto, @CurrentUser() user: AuthUser) {
        return this.characterService.getCharacter(params.id, user.userId);
    }

    @Version('1')
    @Post()
    @ApiOperation({
        summary: 'Create a character',
        description: 'Create a new character with its base statistics. It is automatically linked to the authenticated user.',
    })
    @ApiCreatedResponse({ type: CharacterResponseDto.Output })
    async createCharacter(@Body() createCharacterDto: CreateCharacterDto, @CurrentUser() user: AuthUser) {
        return this.characterService.createCharacter(createCharacterDto, user.userId);
    }

    @Version('1')
    @Put(':id')
    @ApiOperation({
        summary: 'Update a character',
        description: 'Update an existing character partially. Only accessible if it belongs to the authenticated user.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async updateCharacter(
        @Param() params: MongoIdParamDto,
        @Body() updateCharacterDto: UpdateCharacterDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.characterService.updateCharacter(params.id, updateCharacterDto, user.userId);
    }

    @Version('1')
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a character',
        description: 'Delete a character definitively. Only accessible if it belongs to the authenticated user.',
    })
    @ApiNoContentResponse({ description: 'Character deleted successfully' })
    async deleteCharacter(@Param() params: MongoIdParamDto, @CurrentUser() user: AuthUser): Promise<void> {
        return this.characterService.deleteCharacter(params.id, user.userId);
    }

    @Version('1')
    @Post(':id/items/:itemId')
    @ApiOperation({
        summary: 'Add an item to a character',
        description: 'Add an item to a character.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async addItemToCharacter(@Param() params: CharacterItemParamDto, @CurrentUser() user: AuthUser) {
        return this.characterService.addItemToCharacter(params.id, params.itemId, user.userId);
    }

    @Version('1')
    @Delete(':id/items/:itemId')
    @ApiOperation({
        summary: 'Remove an item from a character',
        description:
            'Remove an item snapshot from a character inventory. Use the snapshot _id (from character.items), not the catalog item id.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async removeItemFromCharacter(@Param() params: CharacterItemParamDto, @CurrentUser() user: AuthUser) {
        return this.characterService.removeItemFromCharacter(params.id, params.itemId, user.userId);
    }

    @Version('1')
    @Post(':id/spells/:spellId')
    @ApiOperation({
        summary: 'Add an spell to a character',
        description: 'Add an spell to a character.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async addSpellToCharacter(@Param() params: CharacterSpellParamDto, @CurrentUser() user: AuthUser) {
        return this.characterService.addSpellToCharacter(params.id, params.spellId, user.userId);
    }

    @Version('1')
    @Delete(':id/spells/:spellId')
    @ApiOperation({
        summary: 'Remove an spell from a character',
        description:
            'Remove an spell snapshot from a character inventory. Use the snapshot _id (from character.spells), not the catalog spell id.',
    })
    @ApiOkResponse({ type: CharacterResponseDto.Output })
    async removeSpellFromCharacter(@Param() params: CharacterSpellParamDto, @CurrentUser() user: AuthUser) {
        return this.characterService.removeSpellFromCharacter(params.id, params.spellId, user.userId);
    }
}
