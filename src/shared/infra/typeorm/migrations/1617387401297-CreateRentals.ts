import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1617387401297 implements MigrationInterface {
  private table = new Table({
    name: "rentals",
    columns: [
      {
        name: "id",
        type: "varchar",
        isPrimary: true,
      },
      {
        name: "car_id",
        type: "varchar",
      },
      {
        name: "user_id",
        type: "varchar",
      },
      {
        name: "start_date",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "end_date",
        type: "timestamp",
        isNullable: true,
      },
      {
        name: "expected_return_date",
        type: "timestamp",
      },
      {
        name: "total",
        type: "integer",
        isNullable: true,
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
    foreignKeys: [
      {
        name: "FKCarRental",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      {
        name: "FKUserRental",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
