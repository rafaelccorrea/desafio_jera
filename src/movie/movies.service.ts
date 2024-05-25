import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
          movie: { external_id: movieId },
        },
      });

      if (!profileMovie) {
        throw new NotFoundException('Profile-Movie relation not found');
      }

      profileMovie.watched = true;

      await this.profileMoviesMovieRepository.save(profileMovie);
    }, this.connection);
  }

  private async validateProfile(userId: number, profileId: number) {
    const profile = await this.profileMoviesMovieRepository.findOne({
      where: {
        profile: {
          id: profileId,
          user: {
            id: userId,
          },
        },
      },
    });

    if (!profile) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este perfil.',
      );
    }
  }

  async movieListProfile(userId: number, profileId: number): Promise<any[]> {
    await this.validateProfile(userId, profileId);

    const movies = await this.profileMoviesMovieRepository.find({
      relations: ['movie'],
      where: {
        profile: { id: profileId },
      },
    });

    return movies.map((profileMovie) => ({
      movie: profileMovie.movie,
      watched: profileMovie.watched,
    }));
  }
}
