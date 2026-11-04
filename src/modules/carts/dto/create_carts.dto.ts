import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateCartsDto {
    @IsNotEmpty()
    @IsUUID()
    user_id!: string;
}

export class UpdateCartsDto {
}