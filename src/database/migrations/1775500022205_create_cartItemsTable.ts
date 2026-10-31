
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class createCartItemsTable1775500022205
implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "cart_items",

                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "cart_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "quantity",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],

                foreignKeys: [
                    {
                        name: "FK_CartItems_Cart",
                        columnNames: ["cart_id"],
                        referencedTableName: "carts",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FK_CartItems_Product",
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],

                checks: [
                    {
                        name: "CHK_cart_items_quantity",
                        expression: "quantity > 0",
                    },
                ],

                uniques: [
                    {
                        name: "UQ_cart_items_cart_product",
                        columnNames: ["cart_id", "product_id"],
                    },
                ],
            })
        );

        await queryRunner.createIndex(
            "cart_items",
            new TableIndex({
                name: "IDX_cart_items_cart_id",
                columnNames: ["cart_id"],
            }),
        );

        await queryRunner.createIndex(
            "cart_items",
            new TableIndex({
                name: "IDX_cart_items_product_id",
                columnNames: ["product_id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart_items");
    }
}
