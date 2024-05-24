import { MigrationInterface, QueryRunner } from 'typeorm';

export class Movies1716497277766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "movie" (
        "id" SERIAL PRIMARY KEY,
        "external_id" INT NOT NULL,
        "title" VARCHAR(255) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "movie";
    `);
  }
}
