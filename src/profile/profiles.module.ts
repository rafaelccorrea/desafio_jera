import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from '../database/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
