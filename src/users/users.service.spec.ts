import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import { UserRepository } from '../database/repositories/user.repositorie';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        UserRepository,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User Operations', () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      birthDate: '11/03/1998',
    };

    it('should create a new user', async () => {
      const user = { id: 1, ...createUserDto } as User;

      jest.spyOn(repository, 'create').mockReturnValue(user as any);
      jest.spyOn(repository, 'save').mockResolvedValue(user as any);

      const createdUser = await service.createUser(createUserDto);

      expect(createdUser).toEqual(user);
    });

    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const foundUser = await service.findByEmail(email);

      expect(foundUser).toEqual(user);
    });

    it('should return undefined if user not found by email', async () => {
      const email = 'test@example.com';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const foundUser = await service.findByEmail(email);

      expect(foundUser).toBeUndefined();
    });

    it('should return a user by id', async () => {
      const id = 1;
      const user = { id, email: 'test@example.com' } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const foundUser = await service.findById(id);

      expect(foundUser).toEqual(user);
    });

    it('should return undefined if user not found by id', async () => {
      const id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const foundUser = await service.findById(id);

      expect(foundUser).toBeUndefined();
    });
  });
});
