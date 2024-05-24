import { EntityRepository, Repository } from 'typeorm';
import { ProfileMovie } from '../entities/profile-movie.entity';

@EntityRepository(ProfileMovie)
export class ProfileMovieRepository extends Repository<ProfileMovie> {}
