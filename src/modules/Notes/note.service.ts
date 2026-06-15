import { CreateNoteDto } from '@/modules/notes/dto/request/create-note.dto';
import { Note, NoteDocument } from '@/modules/notes/models/note.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

    async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
        const note = new this.noteModel(createNoteDto);
        return await note.save();
    }
}
