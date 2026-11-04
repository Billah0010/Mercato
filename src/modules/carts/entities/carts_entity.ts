import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/users_entity";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    created_at?: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updated_at?: Date;
}