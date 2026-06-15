import { ItemModule } from '@/modules/Items/item.module';
import { NoteModule } from '@/modules/Notes/note.module';
import { SpellModule } from '@/modules/Spells/spell.module';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterModule } from '../modules/characters/character.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_DB_ENDPOINT || 'mongodb://localhost:27017/rolistica'),
        CharacterModule,
        ItemModule,
        SpellModule,
        NoteModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
