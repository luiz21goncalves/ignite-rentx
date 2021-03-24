import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserDeleteFieldUsername1616627074346
  implements MigrationInterface {
  private column = new TableColumn({
    name: "username",
    type: "varchar",
    isUnique: true,
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", this.column);
  }
}
