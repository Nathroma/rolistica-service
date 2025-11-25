import { CharacterStats } from '@/types/character';
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  gameSystem?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  level?: number;

  @ValidateNested()
  stats!: CharacterStats;
}

