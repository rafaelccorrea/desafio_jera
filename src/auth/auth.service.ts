import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities/user.entity';
import { PROVIDER_AUTH_LOGIN } from '../users/types/provider.auth.login';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    const payload = {
      email: user.email,
      id: user.id,
      profiles: user.profiles,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async validateFacebookUser(profile: {
    facebookId: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const { facebookId, email, firstName, lastName } = profile;
    const name = `${firstName} ${lastName}`;

    return this.usersService.createOrUpdateUser({
      email,
      name,
      provider: PROVIDER_AUTH_LOGIN.FACEBOOK,
      facebookId,
    });
  }

  async loginWithFacebook(user: User): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      id: user.id,
      profiles: user.profiles,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
