import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from '../database/entities/profile.entity';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { UserRepository } from '../database/repositories/user.repository';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      User,
      UserRepository,
      ProfileRepository,
    ]),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
