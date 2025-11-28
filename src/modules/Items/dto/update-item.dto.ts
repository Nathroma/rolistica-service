import { Injectable } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

@Injectable()
export class UpdateItemDto {
  @ApiPropertyOptional({ description: 'Nom de l\'item', example: 'Épée' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Quantité de l\'item', example: 1 })
  @IsOptional()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ description: 'Description de l\'item', example: 'Une épée très pointue, 1d8 de dégâts, +1 à l\'attaque' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Type de l\'item', example: 'weapon' })
  @IsOptional()
  @IsString()
  @IsEnum(['weapon', 'armor', 'tool', 'other'])
  type: 'weapon' | 'armor' | 'tool' | 'other';

  @ApiPropertyOptional({ description: 'Poids de l\'item', example: 1 })
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiPropertyOptional({ description: 'Valeur de l\'item', example: 10 })
  @IsOptional()
  @IsNumber()
  value: number;

  @ApiPropertyOptional({ description: 'Action de l\'item', example: 'action' })
  @IsOptional()
  @IsString()
  @IsEnum(['action', 'bonusAction', 'reaction', 'other'])
  action?: 'action' | 'bonusAction' | 'reaction' | 'other';
}