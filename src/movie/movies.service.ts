import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { runInTransaction } from '../helpers/runTransaction';
import { ProfileMovieRepository } from '../database/repositories/profile.movie.repository';
import { ProfileMovie } from '../database/entities/profile-movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(ProfileMovie)
    private readonly profileMoviesMovieRepository: ProfileMovieRepository,
    private readonly connection: Connection,
  ) {}

  async markMovieAsWatched(profileId: number, movieId: number): Promise<void> {
    await runInTransaction(async () => {
      const profileMovie = await this.profileMoviesMovieRepository.findOne({
        where: {
          profile: { id: profileId },
          movie: { id: movieId },
        },
      });

      if (!profileMovie) {
        throw new NotFoundException('Profile-Movie relation not found');
      }

      profileMovie.watched = true;

      await this.profileMoviesMovieRepository.save(profileMovie);
    }, this.connection);
  }
}
