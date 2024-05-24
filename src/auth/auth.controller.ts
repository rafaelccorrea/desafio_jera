import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { FacebookAuthGuard } from './guard/facebook-auth.guard';

@ApiTags('Authenticação de usuários')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso.' })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Login via Facebook' })
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<void> {}

  @ApiOperation({ summary: 'Callback para login via Facebook' })
  @ApiResponse({
    status: 200,
    description: 'Token de acesso gerado com sucesso',
  })
  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginCallback(@Req() req): Promise<{ accessToken: string }> {
    return this.authService.loginWithFacebook(req.user);
  }
}
