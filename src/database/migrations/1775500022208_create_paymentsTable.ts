import{
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
}from "typeorm";

export class CreatePaymentsTable1775500022208 implements MigrationInterface{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payments",
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
                        name:"method",
                        type:"enum",
                        enum: ["credit_card", "debit_card", "paypal"],
                        enumName: "payment_method_enum",
                        default:"'pending'",
                        isNullable:false,
                    },
                    {
                        name:"amount",
                        type:"decimal",
                        precision:10,
                        scale:2,
                        isNullable:false,
                    },
                    {
                        name: "transaction_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name:"gateway_response",
                        type: "jsonb",
                        isNullable:true,

                    },
                    {
                        name:"paid_at",
                        type:"timestamp",
                        isNullable:true,
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"current_timestamp",
                    },
                    {
                        name:"updated_at",
                        type:"timestamp",
                        default:"current_timestamp",
                    },
                ],
                foreignKeys:[
                    {
                        columnNames:["order_id"],
                        referencedTableName:"orders",
                        referencedColumnNames:["id"],
                        onDelete:"CASCADE",
                    },
                ],
                checks:[
                    {expression: "amount>=0"}],
            })
        );
    
await queryRunner.createIndex(
            "payments",
            new TableIndex({
                name: "IDX_payments_order_id",
                columnNames: ["order_id"],
            }),
        );
await queryRunner.createIndex(
            "payments",
            new TableIndex({
                name: "IDX_payments_status",
                columnNames: ["status"],
            }),
        
        );
}
public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");        

    }    
}