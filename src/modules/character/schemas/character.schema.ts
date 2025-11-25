import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ 
  timestamps: true,
  collection: 'characters'
})
export class Character {
  _id: Types.ObjectId;

  @Prop({ required: false, type: String })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 1, min: 1, max: 20 })
  level: number;

  @Prop({
    required: false,
    type: {
      strength: { type: Number, default: 10 , min: 1, max: 30},
      dexterity: { type: Number, default: 10 , min: 1, max: 30},
      constitution: { type: Number, default: 10 , min: 1, max: 30},
      intelligence: { type: Number, default: 10 , min: 1, max: 30},
      wisdom: { type: Number, default: 10 , min: 1, max: 30},
      charisma: { type: Number, default: 10 , min: 1, max: 30},
    },
  })
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  @Prop({ default: 'D&D 5e' })
  gameSystem: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

