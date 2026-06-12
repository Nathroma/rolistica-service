import { UpdateItemDto } from '@/modules/Items/dto/update-item.dto';
import { createItemSchema } from '@/modules/Items/schemas/create-item.schema';
import { updateItemSchema } from '@/modules/Items/schemas/update-item.schema';
import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { ZodSchemaPipe } from '@/pipes/zod-schema.pipe';
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, Version } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Version('1')
    @Get(':id')
    async getItem(@Param() params: MongoIdParamDto): Promise<Item> {
        return this.itemService.getItem(params.id);
    }

    @Version('1')
    @Post()
    @UsePipes(new ZodSchemaPipe(createItemSchema))
    async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.createItem(createItemDto);
    }

    @Version('1')
    @Put(':id')
    @UsePipes(new ZodSchemaPipe(updateItemSchema))
    async updateItem(@Param() params: MongoIdParamDto, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
        return this.itemService.updateItem(params.id, updateItemDto);
    }

    @Version('1')
    @Delete(':id')
    async deleteItem(@Param() params: MongoIdParamDto): Promise<void> {
        return this.itemService.deleteItem(params.id);
    }
}
