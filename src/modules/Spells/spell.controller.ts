import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { CreateSpellDto } from '@/modules/spells/dtos/request/create-spell.dto';
import { UpdateSpellDto } from '@/modules/spells/dtos/request/update-spell.dto';
import { Spell } from '@/modules/spells/models/spell.model';
import { SpellService } from '@/modules/spells/spell.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('spells')
@Controller('spells')
export class SpellController {
    constructor(private readonly spellService: SpellService) {}

    @Version('1')
    @Get(':id')
    async getSpell(@Param() params: MongoIdParamDto): Promise<Spell> {
        return this.spellService.getSpell(params.id);
    }

    @Version('1')
    @Post()
    async createSpell(@Body() createSpellDto: CreateSpellDto): Promise<Spell> {
        return this.spellService.createSpell(createSpellDto);
    }

    @Version('1')
    @Put(':id')
    async updateSpell(@Param() params: MongoIdParamDto, @Body() updateSpellDto: UpdateSpellDto): Promise<Spell> {
        return this.spellService.updateSpell(params.id, updateSpellDto);
    }

    @Version('1')
    @Delete(':id')
    async deleteSpell(@Param() params: MongoIdParamDto): Promise<void> {
        return this.spellService.deleteSpell(params.id);
    }
}
