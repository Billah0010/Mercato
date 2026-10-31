
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
} from "typeorm";

export class createCarts1775500022204
implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "carts",

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
                        name: "FK_Cart_User",
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );

        await queryRunner.createIndex(
            "carts",
            new TableIndex({
                name: "IDX_carts_user_id",
                columnNames: ["user_id"],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("carts");
    }
}
