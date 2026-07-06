import { Public } from '@/modules/auth/decorators/public.decorator';
import { CreateItemDto } from '@/modules/items/dtos/request/create-item.dto';
import { UpdateItemDto } from '@/modules/items/dtos/request/update-item.dto';
import { ItemService } from '@/modules/items/item.service';
import { Item } from '@/modules/items/models/item.model';
import { MongoIdParamDto } from '@/modules/schemas/mongo-id-param.schema';
import { Body, Controller, Delete, Get, Param, Post, Put, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Public()
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
    async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.createItem(createItemDto);
    }

    @Version('1')
    @Put(':id')
    async updateItem(@Param() params: MongoIdParamDto, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
        return this.itemService.updateItem(params.id, updateItemDto);
    }

    @Version('1')
    @Delete(':id')
    async deleteItem(@Param() params: MongoIdParamDto): Promise<void> {
        return this.itemService.deleteItem(params.id);
    }
}
