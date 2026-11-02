import { Role } from "@/src/common/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";


@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "name" })
    name!: string;


    @Column({ name: "email" })
    email!: string;

    @Column({ name: "password" })
    password!: string;

    @Column({ name: "phn_no" })
    phnNo!: string;
    
    @Column({ name: "role", type: "enum", enum: Role })
    role!: Role;

    @Column({ name: "is_active" })
    isActive?: boolean;

}