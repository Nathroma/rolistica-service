import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { CharacterStats } from '../../../types/character';

class PartialStatsDto {
  @ApiPropertyOptional({ description: 'Force', example: 10 })
  @IsOptional()
  @IsNumber()
  strength?: number;

  @ApiPropertyOptional({ description: 'Dextérité', example: 10 })
  @IsOptional()
  @IsNumber()
  dexterity?: number;

  @ApiPropertyOptional({ description: 'Constitution', example: 10 })
  @IsOptional()
  @IsNumber()
  constitution?: number;

  @ApiPropertyOptional({ description: 'Intelligence', example: 10 })
  @IsOptional()
  @IsNumber()
  intelligence?: number;

  @ApiPropertyOptional({ description: 'Sagesse', example: 10 })
  @IsOptional()
  @IsNumber()
  wisdom?: number;

  @ApiPropertyOptional({ description: 'Charisme', example: 10 })
  @IsOptional()
  @IsNumber()
  charisma?: number;
}

export class UpdateCharacterDto {
  @ApiPropertyOptional({ description: 'Nom du personnage', example: 'Aragorn' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Niveau du personnage', example: 5, minimum: 1, maximum: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  level?: number;

  @ApiPropertyOptional({ description: 'Système de jeu', example: 'D&D 5e' })
  @IsOptional()
  @IsString()
  gameSystem?: string;

  @ApiPropertyOptional({ description: 'Statistiques du personnage', type: PartialStatsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => PartialStatsDto)
  stats?: Partial<CharacterStats>;
}

