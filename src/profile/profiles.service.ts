import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from '../database/entities/user.entity';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { Movie } from '../database/entities/movie.entity';
import { MovieRepository } from '../database/repositories/movie.repository';
import { AddMovieDto } from './dto/profile-movie.dto';
import { runInTransaction } from '~/helpers/runTransaction';
import { Connection } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Movie) private movieRepository: MovieRepository,
    private readonly connection: Connection,
  ) {}

  async createProfile(
    createProfileDto: CreateProfileDto,
    userId: number,
    maxProfilesPerUser: number = 4,
  ): Promise<void> {
    await runInTransaction(async () => {
      await this.validateUser(userId);
      await this.validateProfileLimit(userId, maxProfilesPerUser);
      await this.validateProfileName(createProfileDto.name, userId);

      const profile = this.profileRepository.create({
        ...createProfileDto,
        user: { id: userId },
      });

      await this.profileRepository.save(profile);
    }, this.connection);
  }

  async findAllProfilesByUserId(userId: number): Promise<Profile[]> {
    await this.validateUser(userId);
    return await this.profileRepository.find({
      where: { user: { id: userId } },
    });
  }

  private async validateUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException(
        `Usuário com o ID ${userId} não encontrado`,
      );
    }
  }

  private async validateProfileName(
    profileName: string,
    userId: number,
  ): Promise<void> {
    const existingProfile = await this.profileRepository.findOne({
      where: { name: profileName, user: { id: userId } },
    });
    if (existingProfile) {
      throw new BadRequestException(
        `Já existe um perfil com o nome '${profileName}' para este usuário`,
      );
    }
  }

  private async validateProfileLimit(
    userId: number,
    maxProfilesPerUser: number,
  ): Promise<void> {
    const userProfilesCount = await this.profileRepository.count({
      where: { user: { id: userId } },
    });
    if (userProfilesCount >= maxProfilesPerUser) {
      throw new BadRequestException(
        `O usuário atingiu o limite máximo de ${maxProfilesPerUser} perfis`,
      );
    }
  }

  async addMovieToProfile(
    profileId: number,
    movieData: AddMovieDto,
  ): Promise<Profile> {
    return runInTransaction(async () => {
      const profile = await this.profileRepository.findOne({
        where: { id: profileId },
        relations: ['movies'],
      });
      let movie = await this.movieRepository.findOne({
        where: { external_id: movieData.external_id },
      });

      if (!movie) {
        movie = this.movieRepository.create(movieData);
        await this.movieRepository.save(movie);
      }

      profile.movies.push(movie);
      return this.profileRepository.save(profile);
    }, this.connection);
  }
}
