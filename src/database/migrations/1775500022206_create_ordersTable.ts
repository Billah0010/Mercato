
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class CreateOrderItemsTable1775500022206
implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "order_items",

                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "order_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "product_name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "unit_price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
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
                ],

                foreignKeys: [
                    {
                        name: "FK_OrderItems_Order",
                        columnNames: ["order_id"],
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FK_OrderItems_Product",
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL",
                    },
                ],

                checks: [
                    {
                        name: "CHK_order_items_quantity",
                        expression: `"quantity" > 0`,
                    },
                    {
                        name: "CHK_order_items_unit_price",
                        expression: `"unit_price" >= 0`,
                    },
                ],
            })
        );

        await queryRunner.createIndex(
            "order_items",
            new TableIndex({
                name: "IDX_order_items_order_id",
                columnNames: ["order_id"],
            }),
        );

        await queryRunner.createIndex(
            "order_items",
            new TableIndex({
                name: "IDX_order_items_product_id",
                columnNames: ["product_id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order_items");
    }
}
