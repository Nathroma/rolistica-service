import { CreateSpellDto } from '@/modules/spells/dtos/request/create-spell.dto';
import { UpdateSpellDto } from '@/modules/spells/dtos/request/update-spell.dto';
import { Spell } from '@/modules/spells/models/spell.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SpellService {
    constructor(@InjectModel(Spell.name) private spellModel: Model<Spell>) {}

    async createSpell(createSpellDto: CreateSpellDto): Promise<Spell> {
        const spell = new this.spellModel(createSpellDto);
        return await spell.save();
    }

    async getSpell(id: string): Promise<Spell> {
        const spell = await this.spellModel.findById(id);
        if (!spell) {
            throw new NotFoundException();
        }
        return spell;
    }

    async updateSpell(id: string, updateSpellDto: UpdateSpellDto): Promise<Spell> {
        const spell = await this.spellModel.findByIdAndUpdate(id, updateSpellDto, { new: true });
        if (!spell) {
            throw new NotFoundException();
        }
        return spell;
    }

    async deleteSpell(id: string): Promise<void> {
        const spell = await this.spellModel.findById(id);
        if (!spell) {
            throw new NotFoundException();
        }
        await spell.deleteOne();
    }
}
