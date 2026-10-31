import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm";

export class createUsersTable1775500022201 
implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "gen_random_uuid()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                       name: "PhnNo",
                       type: "varchar",
                       length:"12",
                       isNullable: false, 
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["admin", "user"],
                        default: "'customer'",
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true,
                    },

                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}