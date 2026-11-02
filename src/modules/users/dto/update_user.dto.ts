import { Role } from "@/src/common/enums/role.enum";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    name: string="";

    @IsOptional()
    email: string="";

    @IsOptional()
    password: string="";

    @IsOptional()
    phnNo: string="";

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    isActive?: boolean=true;




}