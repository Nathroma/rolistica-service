import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { LoggingModule } from '@/common/logging/logging.module';
import { RequestLoggingInterceptor } from '@/common/logging/request-logging.interceptor';
import { parsedEnv } from '@/config/env';
import { AuthModule } from '@/modules/auth/auth.module';
import { CharacterModule } from '@/modules/characters/character.module';
import { ItemModule } from '@/modules/items/item.module';
import { NoteModule } from '@/modules/notes/note.module';
import { SpellModule } from '@/modules/spells/spell.module';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        LoggingModule,
        MongooseModule.forRoot(parsedEnv.MONGO_DB_ENDPOINT),
        AuthModule,
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
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestLoggingInterceptor,
        },
    ],
})
export class AppModule {}
