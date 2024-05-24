import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../database/entities/movie.entity';
import { MovieRepository } from '../database/repositories/movie.repository';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ProfileMovieRepository } from '../database/repositories/profile.movie.repository';
import { ProfileMovie } from '../database/entities/profile-movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      ProfileMovie,
      MovieRepository,
      ProfileMovieRepository,
    ]),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
