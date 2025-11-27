import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ItemAction, ItemType } from "src/types/item";

@Schema({
  timestamps: true,
  collection: 'items'
})
export class Item {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: false, type: String })
  description?: string;

  @Prop({ required: true, type: String })
  action: ItemAction;

  @Prop({ required: true, type: Number, default: 0 })
  weight: number;

  @Prop({ required: true, type: String })
  type: ItemType;

  @Prop({ required: false, type: Number, default: 0 })
  value: number;
}