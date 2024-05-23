import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../database/entities/user.entity';

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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        birthDate: new Date(),
      };

      const user = {
        id: 1,
        ...createUserDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(user as any);
      jest.spyOn(repository, 'save').mockResolvedValue(user as any);

      expect(await service.createUser(createUserDto)).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findByEmail(email)).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      const email = 'test@example.com';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      expect(await service.findByEmail(email)).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const id = 1;
      const user = { id, email: 'test@example.com' } as User;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findById(id)).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      const id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      expect(await service.findById(id)).toBeUndefined();
    });
  });
});
