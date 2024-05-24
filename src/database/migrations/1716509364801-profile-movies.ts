import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileMovies1716516550145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "profile_movie" (
        "id" SERIAL,
        "profileId" INTEGER NOT NULL,
        "movieId" INTEGER NOT NULL,
        "isWatchlisted" BOOLEAN NOT NULL DEFAULT true,
        "watched" BOOLEAN NOT NULL DEFAULT false,
        CONSTRAINT "PK_ProfileMoviesMovie" PRIMARY KEY ("profileId", "movieId"),
        CONSTRAINT "FK_Profile_Movie_Profile" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_Movie_Profile_Movie" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile_movie"`);
  }
}
