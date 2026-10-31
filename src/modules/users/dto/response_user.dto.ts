
import { Exclude, Expose } from "class-transformer";
import { Role } from "../../../common/enums/role.enum";

export class ResponseUserDto {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    email!: string;

    @Expose()
    phnNo!: string;

    @Expose()
    role!: Role;

    @Expose()
    isActive!: boolean;

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial);
    }
}
