import { IsString, IsOptional, IsNumber, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterStats } from '../../../types/character';

class PartialStatsDto {
  @IsOptional()
  @IsNumber()
  strength?: number;

  @IsOptional()
  @IsNumber()
  dexterity?: number;

  @IsOptional()
  @IsNumber()
  constitution?: number;

  @IsOptional()
  @IsNumber()
  intelligence?: number;

  @IsOptional()
  @IsNumber()
  wisdom?: number;

  @IsOptional()
  @IsNumber()
  charisma?: number;
}

export class UpdateCharacterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  level?: number;

  @IsOptional()
  @IsString()
  gameSystem?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PartialStatsDto)
  stats?: Partial<CharacterStats>;
}

