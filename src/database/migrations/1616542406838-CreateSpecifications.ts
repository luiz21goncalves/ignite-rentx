import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecifications1616542406838 implements MigrationInterface {
  private table = new Table({
    name: "specifications",
    columns: [
      {
        name: "id",
        type: "varchar",
        isPrimary: true,
      },
      {
        name: "name",
        type: "varchar",
      },
      {
        name: "description",
        type: "varchar",
      },
      {
        name: "created_at",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
