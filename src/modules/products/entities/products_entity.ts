import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    slug!: string;

    @Column()
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column()
    stock!: number;

    @Column({ unique: true })
    sku!: string;

    @Column({ type: "text", array: true })
    images!: string[];

    @Column({ name: "is_active" })
    isActive!: boolean;



    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
