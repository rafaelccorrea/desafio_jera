import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../database/repositories/user.repositorie';
import { runInTransaction } from '../helpers/runTransaction';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
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
    }, this.connection);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['profiles'],
    });
  }
}
