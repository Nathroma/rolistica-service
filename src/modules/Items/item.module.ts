import { ItemController } from '@/modules/items/item.controller';
import { ItemService } from '@/modules/items/item.service';
import { Item, ItemSchema } from '@/modules/items/models/item.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}
