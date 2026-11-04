import{
    IsNotEmpty, IsOptional } from "class-validator";

export class CreateCartItemDto {
    @IsNotEmpty()
    quantity: number=0;

    @IsOptional()
    created_at?: Date;
    
    @IsOptional()
    updated_at?: Date;
}

export class UpdateCartItemDto {
    @IsOptional()
    quantity?: number=0;

    @IsOptional()
    created_at?: Date;
    
    @IsOptional()
    updated_at?: Date;
}