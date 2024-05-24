import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { Profile } from '../database/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      UserRepository,
      ProfileRepository,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
