import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Profile } from '../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create profile' })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get profiles by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The profiles have been successfully retrieved.',
    type: [Profile],
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async findAllByUserId(@Param('userId') userId: number): Promise<Profile[]> {
    return this.profilesService.findAllProfilesByUserId(userId);
  }
}
