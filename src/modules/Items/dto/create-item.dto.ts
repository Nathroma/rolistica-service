import { ItemAction, ItemType } from "@/types/item";
import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

@Injectable()
export class CreateItemDto {
  @ApiProperty({ description: 'Nom de l\'item', example: 'Épée' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Quantité de l\'item', example: 1 })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ description: 'Description de l\'item', example: 'Une épée très pointue, 1d8 de dégâts, +1 à l\'attaque' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Type de l\'item', enum: ItemType, example: ItemType.weapon })
  @IsEnum(ItemType)
  type: ItemType;

  @ApiProperty({ description: 'Poids de l\'item', example: 1 })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: 'Valeur de l\'item', example: 10 })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Action de l\'item', enum: ItemAction, example: ItemAction.action })
  @IsEnum(ItemAction)
  action: ItemAction;

  // ===== Specific Equipment Properties =====

  // WEAPON
  @ApiPropertyOptional({ 
    description: 'Dégâts de l\'arme', 
    example: '1d8',
    required: false
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.type === ItemType.weapon)
  damage?: string;

  @ApiPropertyOptional({ 
    description: 'Portée de l\'arme en mètres', 
    example: 3,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.type === ItemType.weapon)
  range?: number;

  @ApiPropertyOptional({ 
    description: 'Propriétés de l\'arme (ex: finesse, lancer, deux mains)', 
    example: ['finesse'],
    required: false
  })
  @IsOptional()
  @IsString({ each: true })
  @ValidateIf((o) => o.type === ItemType.weapon)
  weaponProperties?: string[];

  // ARMOR
  @ApiPropertyOptional({ 
    description: 'Classe d\'armure', 
    example: 16,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.type === ItemType.armor)
  armorClass?: number;

  @ApiPropertyOptional({ 
    description: 'Type d\'armure (light, medium, heavy)', 
    example: 'light',
    required: false
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.type === ItemType.armor)
  armorType?: string;

  @ApiPropertyOptional({ 
    description: 'Désavantage en furtivité', 
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  @ValidateIf((o) => o.type === ItemType.armor)
  stealthDisadvantage?: boolean;
}