import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

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
}

