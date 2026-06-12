import { ItemAction, ItemType } from '@/types/item';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateItemDto {
    @ApiPropertyOptional({ description: "Nom de l'item", example: 'Épée' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: "Quantité de l'item", example: 1 })
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiPropertyOptional({ description: "Description de l'item" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: "Type de l'item", enum: ItemType })
    @IsOptional()
    @IsEnum(ItemType)
    type?: ItemType;

    @ApiPropertyOptional({ description: "Poids de l'item", example: 1 })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiPropertyOptional({ description: "Valeur de l'item", example: 10 })
    @IsOptional()
    @IsNumber()
    value?: number;

    @ApiPropertyOptional({ description: "Action de l'item", enum: ItemAction })
    @IsOptional()
    @IsEnum(ItemAction)
    action?: ItemAction;

    // ===== Specific Equipment Properties =====

    // WEAPON
    @ApiPropertyOptional({
        description: "Dégâts de l'arme",
        example: '1d8',
    })
    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.type === ItemType.weapon)
    damage?: string;

    @ApiPropertyOptional({
        description: "Portée de l'arme en mètres",
        example: 5,
    })
    @IsOptional()
    @IsNumber()
    @ValidateIf((o) => o.type === ItemType.weapon)
    range?: number;

    @ApiPropertyOptional({
        description: "Propriétés de l'arme",
        example: ['finesse'],
    })
    @IsOptional()
    @IsString({ each: true })
    @ValidateIf((o) => o.type === ItemType.weapon)
    weaponProperties?: string[];

    // ARMOR
    @ApiPropertyOptional({
        description: "Classe d'armure",
        example: 16,
    })
    @IsOptional()
    @IsNumber()
    @ValidateIf((o) => o.type === ItemType.armor)
    armorClass?: number;

    @ApiPropertyOptional({
        description: "Type d'armure",
        example: 'light',
    })
    @IsOptional()
    @IsString()
    @ValidateIf((o) => o.type === ItemType.armor)
    armorType?: string;

    @ApiPropertyOptional({
        description: 'Désavantage en furtivité',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    @ValidateIf((o) => o.type === ItemType.armor)
    stealthDisadvantage?: boolean;
}
