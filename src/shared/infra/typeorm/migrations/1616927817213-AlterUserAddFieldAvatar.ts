import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddFieldAvatar1616927817213
  implements MigrationInterface {
  private column = new TableColumn({
    name: "avatar",
    type: "varchar",
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", this.column);
  }
}
