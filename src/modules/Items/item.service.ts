import { CreateItemDto } from '@/modules/items/dtos/request/create-item.dto';
import { UpdateItemDto } from '@/modules/items/dtos/request/update-item.dto';
import { Item, ItemDocument } from '@/modules/items/models/item.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

    async getItem(id: string): Promise<Item> {
        const item = await this.itemModel.findById(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    async createItem(createItemDto: CreateItemDto): Promise<Item> {
        const item = new this.itemModel(createItemDto);
        return await item.save();
    }

    async updateItem(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    async deleteItem(id: string): Promise<void> {
        const item = await this.itemModel.findById(id);
        if (!item) {
            throw new NotFoundException();
        }
        await item.deleteOne();
    }
}
