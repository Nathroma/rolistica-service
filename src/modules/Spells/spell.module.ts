import { Spell, SpellSchema } from '@/modules/spells/models/spell.model';
import { SpellController } from '@/modules/spells/spell.controller';
import { SpellService } from '@/modules/spells/spell.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }])],
    controllers: [SpellController],
    providers: [SpellService],
})
export class SpellModule {}
