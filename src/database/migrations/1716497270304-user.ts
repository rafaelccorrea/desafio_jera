import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1716497270304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "provider_auth_login_enum" AS ENUM('facebook', 'system');
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "facebookId" VARCHAR(255),
        "email" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "birthDate" VARCHAR(255) NOT NULL,
        "provider" "provider_auth_login_enum" NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user";
    `);

    await queryRunner.query(`
      DROP TYPE "provider_auth_login_enum";
    `);
  }
}
