import { UpdateItemDto } from "@/modules/Items/dto/update-item.dto";
import { createItemSchema } from "@/modules/Items/schemas/create-item.schema";
import { updateItemSchema } from "@/modules/Items/schemas/update-item.schema";
import { mongoIdSchema } from "@/modules/schemas/mongo-id.schema";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, Version } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { Item } from "./entities/item.entity";
import { ItemService } from "./item.service";

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Version('1')
  @Get(':id')
  @UsePipes(new ZodValidationPipe(mongoIdSchema))
  async getItem(@Param('id') id: string): Promise<Item> {
    return this.itemService.getItem(id);
  }

  @Version('1')
  @Post()
  @UsePipes(new ZodValidationPipe(createItemSchema))
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.createItem(createItemDto);
  }

  @Version('1')
  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateItemSchema))
  async updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemService.updateItem(id, updateItemDto);
  }

  @Version('1')
  @Delete(':id')
  @UsePipes(new ZodValidationPipe(mongoIdSchema))
  async deleteItem(@Param('id') id: string): Promise<void> {
    return this.itemService.deleteItem(id);
  }
}