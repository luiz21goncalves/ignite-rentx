import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarImages1617372718824 implements MigrationInterface {
  private table = new Table({
    name: "cars_image",
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
        name: "image_name",
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
    foreignKeys: [
      {
        name: "FKCarImage",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
