import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class CreateOrderItemsTable1775500022207 
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
                        isNullable: false,

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

                    },
                    {
                        name: "quantity",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"current_timestamp",
                        
                    },
                ],
                foreignKeys: [
                    {
                        columnNames:["order_id"],
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames:["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",

                    },
                ],
            checks: [
          { expression: `"quantity" > 0` },
          { expression: `"unit_price" >= 0` },
        ],
        }),
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
                