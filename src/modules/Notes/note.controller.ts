import { CreateNoteDto } from '@/modules/Notes/dto/request/create-note.dto';
import { Note } from '@/modules/Notes/models/note.model';
import { NoteService } from '@/modules/Notes/note.service';
import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}
    @Version('1')
    @Post()
    async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
        return this.noteService.createNote(createNoteDto);
    }
}
