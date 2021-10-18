import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePrograms1634305047068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "programs",
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
                  name: "edition",
                  type: "varchar",
                  length: "50",
                  isNullable: false
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  isNullable: false
                }
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("programs");
    }

}

