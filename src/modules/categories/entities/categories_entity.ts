import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "name" })
    name!: string;

    @Column({ name: "slug", unique: true })
    slug!: string;

    @Column({ name: "description", type: "text", nullable: true })
    description?: string;

    @Column({ name: "parent_id", nullable: true })
    parentId?: string;
}