import { Role } from "@/src/common/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";


@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;


    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phnNo!: string;
    
    @Column()
    role!: Role;

    @Column()
    isActive!: boolean;

}