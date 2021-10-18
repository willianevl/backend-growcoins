import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableAccountMovements1634306743237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "account_movements",
              columns: [
                {
                  name: "uid",
                  type: "varchar",
                  length: '36',
                  isPrimary: true,
                  isNullable: false,
                },
                {
                  name: "value",
                  type: "decimal",
                  length: "50",
                  isNullable: false,
                },
                {
                  name: "description",
                  type: "varchar",
                  length: "50",
                  isNullable: false,
                },
                {
                    name: "type",
                    type: "varchar",
                    length: "25",
                    isNullable: false,
                },
                {
                  name: "user_uid",
                  type: "varchar",
                  length: '36',
                  isNullable: false,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  isNullable: false,
                },
              ],
            })
        );
        
        await queryRunner.createForeignKey(
            "account_movements",
            new TableForeignKey({
                columnNames: ["user_uid"],
                referencedColumnNames: ["uid"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("account_movements");
    }

}
