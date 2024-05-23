import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../database/entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from '../database/entities/user.entity';
import { ProfileRepository } from '../database/repositories/profile.repository';
import { UserRepository } from '../database/repositories/user.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: ProfileRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async createProfile(
    createProfileDto: CreateProfileDto,
    userId: number,
    maxProfilesPerUser: number = 4,
  ): Promise<void> {
    await this.validateUser(userId);
    await this.validateProfileLimit(userId, maxProfilesPerUser);
    await this.validateProfileName(createProfileDto.name, userId);

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: { id: userId },
    });

    await this.profileRepository.save(profile);
  }

  async findAllProfilesByUserId(userId: number): Promise<Profile[]> {
    await this.validateUser(userId);
    return await this.profileRepository.find({
      where: { user: { id: userId } },
    });
  }

  private async validateUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException(
        `Usuário com o ID ${userId} não encontrado`,
      );
    }
  }

  private async validateProfileName(
    profileName: string,
    userId: number,
  ): Promise<void> {
    const existingProfile = await this.profileRepository.findOne({
      where: { name: profileName, user: { id: userId } },
    });
    if (existingProfile) {
      throw new BadRequestException(
        `Já existe um perfil com o nome '${profileName}' para este usuário`,
      );
    }
  }

  private async validateProfileLimit(
    userId: number,
    maxProfilesPerUser: number,
  ): Promise<void> {
    const userProfilesCount = await this.profileRepository.count({
      where: { user: { id: userId } },
    });
    if (userProfilesCount >= maxProfilesPerUser) {
      throw new BadRequestException(
        `O usuário atingiu o limite máximo de ${maxProfilesPerUser} perfis`,
      );
    }
  }
}
