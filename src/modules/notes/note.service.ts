import { Character, CharacterDocument } from '@/modules/characters/models/character.model';
import { CreateNoteDto } from '@/modules/notes/dto/request/create-note.dto';
import { UpdateNoteDto } from '@/modules/notes/dto/request/update-note.dto';
import { Note, NoteDocument } from '@/modules/notes/models/note.model';
import { MongoId } from '@/modules/schemas/mongo-id.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
        @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    ) {}

    async getCharacterNotes(characterId: MongoId): Promise<Note[]> {
        const character = await this.characterModel.findById(characterId);
        if (!character) {
            throw new NotFoundException();
        }

        return character.notes;
    }

    async createCharacterNote(characterId: MongoId, createNoteDto: CreateNoteDto): Promise<Note> {
        const character = await this.characterModel.findById(characterId);
        if (!character) {
            throw new NotFoundException();
        }

        const note = new this.noteModel({ ...createNoteDto, _id: new Types.ObjectId() });

        character.notes.push(note);
        await character.save();

        return note;
    }

    async updateCharacterNote(characterId: MongoId, noteId: MongoId, noteBody: UpdateNoteDto): Promise<Note> {
        const character = await this.characterModel.findOneAndUpdate(
            { _id: characterId, 'notes._id': noteId },
            {
                $set: {
                    'notes.$.title': noteBody.title,
                    'notes.$.content': noteBody.content,
                },
            },
            { new: true },
        );

        if (!character) {
            throw new NotFoundException();
        }

        const note = character.notes.find((n) => n._id.toString() === noteId);

        if (!note) {
            throw new NotFoundException();
        }

        return note;
    }

    async deleteCharacterNote(characterId: MongoId, noteId: MongoId): Promise<void> {
        const character = await this.characterModel.findOneAndUpdate(
            { _id: characterId, 'notes._id': noteId },
            { $pull: { notes: { _id: noteId } } },
        );

        if (!character) {
            throw new NotFoundException();
        }
    }
}
