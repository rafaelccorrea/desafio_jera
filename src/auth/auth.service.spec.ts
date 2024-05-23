import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../database/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const registerUserDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        birthDate: new Date(),
      };

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
      const user = {
        id: 1,
        ...registerUserDto,
        password: hashedPassword,
        profiles: [],
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(user as any);

      expect(await service.register(registerUserDto)).toEqual(user);
    });
  });

  describe('validateUser', () => {
    it('should return the user if validation succeeds', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test User',
        birthDate: new Date(),
        profiles: [],
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      expect(
        await service.validateUser('test@example.com', 'password123'),
      ).toEqual(user);
    });

    it('should throw an error if validation fails', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test User',
        birthDate: new Date(),
        profiles: [],
      };

      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test_token');

      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(await service.login(loginUserDto)).toEqual({
        accessToken: 'test_token',
      });
    });
  });
});
