import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Exclude()
@Schema({
    timestamps: true,
    collection: 'notes',
})
export class Note {
    @Expose()
    @Prop({ required: true, type: Types.ObjectId })
    _id: Types.ObjectId;

    @Expose()
    @Prop({ required: false, type: String })
    title: string;

    @Expose()
    @Prop({ required: false, type: String })
    content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
