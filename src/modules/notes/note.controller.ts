import { CreateNoteDto } from '@/modules/notes/dto/request/create-note.dto';
import { UpdateNoteDto } from '@/modules/notes/dto/request/update-note.dto';
import { Note } from '@/modules/notes/models/note.model';
import { NoteService } from '@/modules/notes/note.service';
import { CharacterNoteParamDto } from '@/modules/schemas/character-note-param.schema';
import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { Body, Controller, Delete, Get, Param, Post, Put, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('characters/:id/notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Version('1')
    @Get()
    async getCharacterNotes(@Param() params: MongoIdParamDto): Promise<Note[]> {
        return this.noteService.getCharacterNotes(params.id);
    }

    @Version('1')
    @Post()
    async createNote(@Param() params: MongoIdParamDto, @Body() createNoteDto: CreateNoteDto): Promise<Note> {
        return this.noteService.createCharacterNote(params.id, createNoteDto);
    }

    @Version('1')
    @Put(':noteId')
    async updateNote(@Param() params: CharacterNoteParamDto, @Body() body: UpdateNoteDto): Promise<Note> {
        return this.noteService.updateCharacterNote(params.id, params.noteId, body);
    }

    @Version('1')
    @Delete(':noteId')
    async deleteCharacterNote(@Param() params: CharacterNoteParamDto): Promise<void> {
        return this.noteService.deleteCharacterNote(params.id, params.noteId);
    }
}
