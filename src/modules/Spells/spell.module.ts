import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Spell, SpellSchema } from './models/spell.model';
import { SpellController } from './spell.controller';
import { SpellService } from './spell.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }])],
    controllers: [SpellController],
    providers: [SpellService],
})
export class SpellModule {}
