import {
  Controller,
  Put,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Movie } from '../database/entities/movie.entity';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ProfileMovie } from '../database/entities/profile-movie.entity';

@ApiTags('Filmes')
@ApiBearerAuth()
@Controller('movies')
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
  @UseGuards(JwtAuthGuard)
  async markMovieAsWatched(
    @Param('profileId') profileId: number,
    @Param('movieId') movieId: number,
  ): Promise<void> {
    await this.moviesService.markMovieAsWatched(profileId, movieId);
  }

  @Get('/me/:profileId')
  @ApiOperation({ summary: 'Obter filmes pelo ID do perfil' })
  @ApiResponse({
    status: 200,
    description: 'Os Filmes foram recuperados com sucesso.',
    type: [ProfileMovie],
  })
  @ApiResponse({ status: 404, description: 'Não Encontrado.' })
  @UseGuards(JwtAuthGuard)
  async findMoviesByIdProvider(
    @Param('profileId') profileId: number,
    @Request() req,
  ): Promise<Movie[]> {
    return this.moviesService.movieListProfile(req.user.id, profileId);
  }
}
