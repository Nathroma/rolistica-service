import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { CharacterModule } from '@/modules/characters/character.module';
import { ItemModule } from '@/modules/items/item.module';
import { NoteModule } from '@/modules/notes/note.module';
import { SpellModule } from '@/modules/spells/spell.module';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
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
