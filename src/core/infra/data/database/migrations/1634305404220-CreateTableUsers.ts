import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableUsers1634305404220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "users",
              columns: [
                {
                  name: "uid",
                  type: "varchar",
                  length: '36',
                  isPrimary: true,
                  isNullable: false,
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "50",
                  isNullable: false,
                },
                {
                  name: "email",
                  type: "varchar",
                  length: "50",
                  isNullable: false,
                },
                {
                  name: "password",
                  type: "varchar",
                  length: "100",
                  isNullable: false,
                },
                {
                  name: "program_name",
                  type: "varchar",
                  length: "50",
                  isNullable: false,
                },
                {
                  name: "edition",
                  type: "varchar",
                  length: "50",
                  isNullable: false
                },
                {
                  name: "admin",
                  type: "boolean",
                  default: false                  
                },
                {
                  name: "pending",
                  type: "boolean",
                  default: true                 
                },
                {
                  name: "user_image",
                  type: "varchar",
                  length: "200",
                  isNullable: true,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  isNullable: false
                },
                {
                  name: "program_uid",
                  type: "varchar",
                  length: '36',
                  isNullable: false,
                },
              ],
            })
        );
        
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["program_uid"],
                referencedColumnNames: ["uid"],
                referencedTableName: "programs",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
