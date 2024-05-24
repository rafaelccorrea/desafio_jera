import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from '../database/entities/profile.entity';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { User } from '../database/entities/user.entity';
import { Movie } from '../database/entities/movie.entity';
import { MovieRepository } from '../database/repositories/movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      User,
      Movie,
      UserRepository,
      ProfileRepository,
      MovieRepository,
    ]),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
