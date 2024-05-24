import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import { Profile } from '../database/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../database/repositories/user.repository';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { runInTransaction } from '../helpers/runTransaction';
import { Connection } from 'typeorm';
import { PROVIDER_AUTH_LOGIN } from './types/provider.auth.login';
import { UserProfile } from './types/user.profile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersService: UserRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    private readonly connection: Connection,
  ) {}

  async createOrUpdateUser(profile: UserProfile): Promise<User> {
    let user = await this.usersService.findOne({
      where: { email: profile.email },
    });

    if (!user) {
      const userData: CreateUserDto = {
        email: profile.email,
        name: profile.name,
        password: profile.password || '',
        birthDate: profile.birthDate || '',
      };

      if (profile.password) {
        userData.password = await bcrypt.hash(profile.password, 10);
      }

      user = this.usersService.create(userData);
      user.provider = profile.provider;

      if (profile.facebookId) {
        user.facebookId = profile.facebookId;
      }

      await this.usersService.save(user);

      const profileData = this.profileRepository.create({
        name: profile.name,
        user: user,
        isPrimary: true,
      });

      await this.profileRepository.save(profileData);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    await runInTransaction(async () => {
      await this.createOrUpdateUser({
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        birthDate: createUserDto.birthDate,
        provider: PROVIDER_AUTH_LOGIN.SYSTEM,
      });
    }, this.connection);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersService.findOne({
      where: { email },
      relations: {
        profiles: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.usersService.findOne({
      where: { id },
      relations: ['profiles'],
    });
  }
}
