import {
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableIndex,
} from "typeorm";

export class createOrdersTable1775500022206 
implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({ 
                name: "orders",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true,
                        default:"gen_random_uuid()",
                    },
                    {
                        name:"order_number",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                        isUnique:true,
                    },
                    {
                        name:"user_id",
                        type:"uuid",
                        isNullable:false,
                    },
                    {
                        name:"status",
                        type:"enum",
                        enum:["pending","processing","completed","cancelled"],
                        enumName:"order_status_enum",
                        default:"'pending'",
                    },
                    {
                        name:"total_price",
                        type:"decimal",
                        precision:10,
                        scale:2,
                        isNullable:false,
                    },
                    {
                        name:"shipping_full_name",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                    },
                    {
                        name:"shipping_phone",
                        type:"varchar",
                        length:"20",
                        isNullable:false,
                    },
                    {
                        name:"shipping_steet",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                    },
                    {
                        name:"shipping_house",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                    },
                    {
                        name:"shipping_city",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                    },
                    {
                        name:"shipping_country",
                        type:"varchar",
                        length:"255",
                        isNullable:false,

                    },

                ],
                foreignKeys:[
                    {
                        columnNames:["user_id"],
                        referencedTableName:"users",
                        referencedColumnNames:["id"],
                        onDelete:"CASCADE",
                    },
                ],
                checks:[
                    {expression: "total_price>=0"}],
            }),
        );
    

await queryRunner.createIndex(
            "orders",
            new TableIndex({
                name: "IDX_orders_user_id",
                columnNames: ["user_id"],
            }),
        );
await queryRunner.createIndex(
            "orders",
            new TableIndex({
                name: "IDX_orders_status",
                columnNames: ["status"],
            }),
        ); 
    }           
public async down(queryRunner: QueryRunner) : Promise<void> {
        await queryRunner.dropTable("orders");
    }
}  
