import { IsNotEmpty } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty()
    name: string="";

    @IsNotEmpty()
    email: string="";

    @IsNotEmpty()
    password: string="";

    @IsNotEmpty()
    phnNo: string="";




}