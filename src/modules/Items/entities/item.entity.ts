import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { ItemAction, ItemType } from 'src/types/item';

export type ItemDocument = HydratedDocument<Item>;
@Exclude()
@Schema({
    timestamps: true,
    collection: 'items',
})
export class Item {
    @Expose()
    @Prop({ required: true, type: String })
    name: string;

    @Expose()
    @Prop({ required: true, type: Number })
    quantity: number;

    @Expose()
    @Prop({ required: false, type: String })
    description?: string;

    @Expose()
    @Prop({ required: true, type: String })
    action: ItemAction;

    @Expose()
    @Prop({ required: true, type: Number, default: 0 })
    weight: number;

    @Expose()
    @Prop({ required: true, type: String })
    type: ItemType;

    @Expose()
    @Prop({ required: false, type: Number, default: 0 })
    value: number;

    // ===== Specific Equipment Properties =====

    // WEAPON properties
    @Expose()
    @Prop({ required: false, type: String })
    damage?: string;

    @Expose()
    @Prop({ required: false, type: Number })
    range?: number;

    @Expose()
    @Prop({ required: false, type: [String], default: [] })
    weaponProperties?: string[];

    // ARMOR properties
    @Expose()
    @Prop({ required: false, type: Number })
    armorClass?: number;

    @Expose()
    @Prop({ required: false, type: String })
    armorType?: string;

    @Expose()
    @Prop({ required: false, type: Boolean, default: false })
    stealthDisadvantage?: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
