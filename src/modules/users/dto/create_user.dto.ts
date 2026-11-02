import { Role } from "@/src/common/enums/role.enum";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    name: string="";

    @IsNotEmpty()
    email: string="";

    @IsNotEmpty()
    password: string="";

    @IsNotEmpty()
    phnNo: string="";

    @IsNotEmpty()
    @IsEnum(Role)
    role!: Role;

    @IsOptional()
    isActive: boolean=true;


}