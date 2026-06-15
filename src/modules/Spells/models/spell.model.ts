import { SpellCastingType, SpellDuration, SpellRange, SpellSchool, SpellType } from '@/types/spell';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Schema({
    timestamps: true,
    collection: 'spells',
})
export class Spell {
    @Expose()
    @Prop({ required: true, type: String })
    name: string;

    @Expose()
    @Prop({ required: false, type: String })
    description: string;

    @Expose()
    @Prop({ required: true, type: String, enum: SpellType })
    type: SpellType;

    @Expose()
    @Prop({ required: false, type: Number })
    level: number;

    @Expose()
    @Prop({ required: false, type: String, enum: SpellSchool })
    school: SpellSchool | undefined;

    @Expose()
    @Prop({ required: false, type: String, enum: SpellCastingType })
    castingTime: SpellCastingType | undefined;

    @Expose()
    @Prop({ required: false, type: String, enum: SpellRange })
    range: SpellRange | undefined;

    @Expose()
    @Prop({ required: false, type: String, enum: SpellDuration })
    duration: SpellDuration | undefined;

    @Expose()
    @Prop({ required: false, type: Boolean })
    concentration: boolean | undefined;

    @Expose()
    @Prop({ required: false, type: Boolean })
    ritual: boolean | undefined;

    @Expose()
    @Prop({ required: false, type: [String] })
    components: string[] | undefined;

    @Expose()
    @Prop({ required: false, type: Date })
    createdAt: Date | undefined;

    @Expose()
    @Prop({ required: false, type: Date })
    updatedAt: Date | undefined;
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
