import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1617144873085 implements MigrationInterface {
  private table = new Table({
    name: "cars",
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
        name: "daily_rate",
        type: "integer",
      },
      {
        name: "available",
        type: "boolean",
        default: true,
      },
      {
        name: "license_plate",
        type: "varchar",
      },
      {
        name: "fine_amount",
        type: "integer",
      },
      {
        name: "brand",
        type: "varchar",
      },
      {
        name: "category_id",
        type: "varchar",
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
        name: "FKCategoryCar",
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        columnNames: ["category_id"],
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
