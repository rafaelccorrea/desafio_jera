import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1716516550145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "profile" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "userId" INTEGER,
        "isPrimary" BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT "FK_Profile_User" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE profile`);
  }
}
