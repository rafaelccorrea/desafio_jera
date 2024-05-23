import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '~/database/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const registerUserDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        birthDate: new Date(),
      };

      const result = {
        id: 1,
        ...registerUserDto,
      };

      jest.spyOn(service, 'register').mockResolvedValue(result as User);

      expect(await controller.register(registerUserDto)).toEqual(result);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = { accessToken: 'test_token' };

      jest.spyOn(service, 'login').mockResolvedValue(result);

      expect(await controller.login(loginUserDto)).toEqual(result);
    });
  });
});
