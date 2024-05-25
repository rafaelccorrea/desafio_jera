import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  UsePipes,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'O usuário foi criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Usuário já existe.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Requisição Inválida.',
  })
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'O usuário foi recuperado com sucesso.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Não Encontrado.' })
  async findById(@Request() req): Promise<User> {
    const userId = req.user.id;
    return this.usersService.findById(userId);
  }
}
