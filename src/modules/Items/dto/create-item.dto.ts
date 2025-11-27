import { ItemAction, ItemType } from "@/types/item";
import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

@Injectable()
export class CreateItemDto {
  @ApiProperty({ description: 'Nom de l\'item', example: 'Épée' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Quantité de l\'item', example: 1 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Description de l\'item', example: 'Une épée très pointue, 1d8 de dégâts, +1 à l\'attaque' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Type de l\'item', example: ItemType.WEAPON })
  @IsString()
  @IsEnum(ItemType)
  type: typeof ItemType;

  @ApiProperty({ description: 'Poids de l\'item', example: 1 })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Valeur de l\'item', example: 10 })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Action de l\'item', example: ItemAction.ACTION })
  @IsString()
  @IsEnum(ItemAction)
  action: typeof ItemAction;
}