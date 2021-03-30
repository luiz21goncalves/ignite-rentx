import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1616620637666 implements MigrationInterface {
  private table = new Table({
    name: "users",
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
        name: "username",
        type: "varchar",
        isUnique: true,
      },
      {
        name: "email",
        type: "varchar",
        isUnique: true,
      },
      {
        name: "password",
        type: "varchar",
      },
      {
        name: "driver_license",
        type: "varchar",
      },
      {
        name: "isAdmin",
        type: "boolean",
        default: false,
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
