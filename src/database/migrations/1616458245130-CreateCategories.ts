import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1616458245130 implements MigrationInterface {
  private table = new Table({
    name: "categoires",
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
