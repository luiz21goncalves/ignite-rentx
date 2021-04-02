import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpecificationsCars1617359944208
  implements MigrationInterface {
  private table = new Table({
    name: "specifications_cars",
    columns: [
      {
        name: "car_id",
        type: "varchar",
      },
      {
        name: "specification_id",
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
        name: "FKSpecificationCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      {
        name: "FKCarSpecification",
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
