import { CharacterStats } from '@/types/character';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

class StatsDto implements CharacterStats {
  @ApiProperty({ description: 'Force', example: 10 })
  @IsNumber()
  strength: number;
  @ApiProperty({ description: 'Dextérité', example: 10 })
  @IsNumber()
  dexterity: number;
  @ApiProperty({ description: 'Constitution', example: 10 })
  @IsNumber()
  constitution: number;
  @ApiProperty({ description: 'Intelligence', example: 10 })
  @IsNumber()
  intelligence: number;
  @ApiProperty({ description: 'Sagesse', example: 10 })
  @IsNumber()
  wisdom: number;
  @ApiProperty({ description: 'Charisme', example: 10 })
  @IsNumber()
  charisma: number;
}

export class CreateCharacterDto {
  @ApiProperty({ description: 'Nom du personnage', example: 'Aragorn' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Système de jeu', example: 'D&D 5e' })
  @IsOptional()
  @IsString()
  gameSystem?: string;

  @ApiPropertyOptional({ description: 'Niveau du personnage', example: 5, minimum: 1, maximum: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  level?: number;

  @ApiProperty({ description: 'Statistiques du personnage', type: StatsDto })
  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;
}

