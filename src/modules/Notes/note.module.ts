import { Note, NoteSchema } from '@/modules/notes/models/note.model';
import { NoteController } from '@/modules/notes/note.controller';
import { NoteService } from '@/modules/notes/note.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
    controllers: [NoteController],
    providers: [NoteService],
    exports: [NoteService],
})
export class NoteModule {}
