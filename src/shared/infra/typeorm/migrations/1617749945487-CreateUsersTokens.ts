import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTokens1617749945487 implements MigrationInterface {
  private table = new Table({
    name: "users_tokens",
    columns: [
      {
        name: "id",
        type: "varchar",
        isPrimary: true,
      },
      {
        name: "refresh_token",
        type: "varchar",
      },
      {
        name: "user_id",
        type: "varchar",
      },
      {
        name: "expires_token",
        type: "timestamp",
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
        name: "FKUserToken",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }
}
