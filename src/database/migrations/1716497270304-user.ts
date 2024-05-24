import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndProfile1716497270304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR(255) UNIQUE NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "name" VARCHAR(255) NOT NULL,
                "birthDate" VARCHAR(255) NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user";
        `);
  }
}
