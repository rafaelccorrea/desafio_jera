import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
