import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Exclude()
@Schema({
  timestamps: true,
  collection: 'characters',
})
export class Character {
  @Prop({ required: false, type: String })
  userId: string;

  @Prop({ required: false, type: String })
  collectionName: string;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop({ default: 1, min: 1, max: 20 })
  level: number;

  @Expose()
  @Prop({
    required: false,
    type: {
      strength: { type: Number, default: 10, min: 1, max: 30 },
      dexterity: { type: Number, default: 10, min: 1, max: 30 },
      constitution: { type: Number, default: 10, min: 1, max: 30 },
      intelligence: { type: Number, default: 10, min: 1, max: 30 },
      wisdom: { type: Number, default: 10, min: 1, max: 30 },
      charisma: { type: Number, default: 10, min: 1, max: 30 },
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

  @Expose()
  @Prop({ default: '' })
  gameSystem: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
