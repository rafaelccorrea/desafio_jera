import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import { Profile } from '../database/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../database/repositories/user.repository';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { runInTransaction } from '../helpers/runTransaction';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    private readonly connection: Connection,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    await runInTransaction(async () => {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        birthDate: createUserDto.birthDate,
      });

      await this.userRepository.save(user);

      const profile = this.profileRepository.create({
        name: createUserDto.name,
        user: user,
        isPrimary: true,
      });

      await this.profileRepository.save(profile);
    }, this.connection);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
      relations: {
        profiles: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['profiles'],
    });
  }
}
