import { Controller, Put, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Movie } from '../database/entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('Filmes')
@Controller('filmes')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Put(':profileId/:movieId/watch')
  @ApiOperation({ summary: 'Marcar um filme como assistido' })
  @ApiNotFoundResponse({ description: 'Filme não encontrado' })
  @ApiResponse({
    status: 200,
    description: 'O filme foi marcada como assistido com sucesso.',
    type: Movie,
  })
  @ApiResponse({ status: 400, description: 'Requisição Inválida.' })
  async markMovieAsWatched(
    @Param('profileId') profileId: number,
    @Param('movieId') movieId: number,
  ): Promise<void> {
    await this.moviesService.markMovieAsWatched(profileId, movieId);
  }
}
