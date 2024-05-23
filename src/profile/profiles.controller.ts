import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Profile } from '../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '~/auth/guard/jwt-auth.guard';

@ApiTags('Perfils')
@ApiBearerAuth()
@Controller('perfils')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar perfil' })
  @ApiResponse({
    status: 201,
    description: 'O perfil foi criado com sucesso.',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Requisição Inválida.' })
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Obter perfis pelo ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Os perfis foram recuperados com sucesso.',
    type: [Profile],
  })
  @ApiResponse({ status: 404, description: 'Não Encontrado.' })
  @UseGuards(JwtAuthGuard)
  async findAllByUserId(@Request() req): Promise<Profile[]> {
    const userId = req.user.id;
    return this.profilesService.findAllProfilesByUserId(userId);
  }
}
