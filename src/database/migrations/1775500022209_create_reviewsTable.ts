import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class CreateReviewsTable1775500022209 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reviews",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "rating",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "comment",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "current_timestamp",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "current_timestamp",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
                checks: [
                    { expression: `"rating" BETWEEN 1 AND 5` },
                ],
            }),
        );

        await queryRunner.createIndex(
            "reviews",
            new TableIndex({
                name: "IDX_reviews_user_id",
                columnNames: ["user_id"],
            }),
        );

        await queryRunner.createIndex(
            "reviews",
            new TableIndex({
                name: "IDX_reviews_product_id",
                columnNames: ["product_id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews");
    }
}