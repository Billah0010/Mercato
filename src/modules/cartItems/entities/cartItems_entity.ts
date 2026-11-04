
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

import { Cart } from "../../carts/entities/carts_entity";
import { Product } from "../../products/entities/products_entity";

@Entity("cart_items")
export class CartItem {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Cart, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "cart_id" })
    cart!: Cart;

    @ManyToOne(() => Product, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @Column({ type: "int" })
    quantity!: number;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    created_at?: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updated_at?: Date;
}
