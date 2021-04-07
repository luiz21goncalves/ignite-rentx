import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersTokenRenameFieldExpiresTokenToExpiresDate1617833236949
  implements MigrationInterface {
  private column = new TableColumn({
    name: "expires_date",
    type: "timestamp",
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users_tokens", this.column);
    await queryRunner.dropColumn("users_tokens", "expires_token");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users_tokens", this.column);
    await queryRunner.addColumn(
      "users_tokens",
      new TableColumn({
        name: "expires_token",
        type: "timestamp",
      })
    );
  }
}
