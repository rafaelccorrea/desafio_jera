import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1716509364801 implements MigrationInterface {
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

    await queryRunner.query(`
      CREATE TABLE "profile_movies_movie" (
        "profileId" INTEGER NOT NULL,
        "movieId" INTEGER NOT NULL,
        CONSTRAINT "PK_ProfileMoviesMovie" PRIMARY KEY ("profileId", "movieId"),
        CONSTRAINT "FK_Profile_Movie_Profile" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_Movie_Profile_Movie" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE profile_movies_movie`);
    await queryRunner.query(`DROP TABLE profile`);
  }
}
