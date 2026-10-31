import{
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,

} from "typeorm";

export class createProductsTable1775500022203 implements MigrationInterface{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy:"uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",   
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "stock",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name:"sku",
                        type:"varchar",
                        length:"100",
                        isNullable:false,
                        isUnique:true,
                    },
                    {
                        name: "images",
                        type: "text",
                        isArray: true,
                        isNullable: true,
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name : "is_active",
                        type: "boolean",
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP(6)",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP(6)",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FK_category",
                        columnNames: ["category_id"],
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        onDelete: "RESTRICT",
                    },
                ],
                checks: [
                    {
                        name: "CHK_price_positive",
                        expression: "price >= 0"
                    },
                    {
                        name: "CHK_stock_non_negative",
                        expression: "stock >= 0"
                    },
                ],
            }),
        );
    

await queryRunner.createIndex(
      "products",
      new TableIndex({
        name: "IDX_products_category_id",
        columnNames: ["category_id"],
      }),
    );
await queryRunner.createIndex(
      "products",
      new TableIndex({
        name: "IDX_products_name",
        columnNames: ["name"],
      }),
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
    }
}