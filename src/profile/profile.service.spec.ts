import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from '../database/entities/profile.entity';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let repository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    repository = module.get<Repository<Profile>>(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create a new profile', async () => {
      const createProfileDto: CreateProfileDto = {
        name: 'Profile 1',
        userId: 1,
      };

      const profile = {
        id: 1,
        ...createProfileDto,
      };

      jest.spyOn(repository, 'create').mockReturnValue(profile as any);
      jest.spyOn(repository, 'save').mockResolvedValue(profile as any);

      expect(await service.createProfile(createProfileDto)).toEqual(profile);
    });
  });

  describe('findAllProfilesByUserId', () => {
    it('should return all profiles for a given user', async () => {
      const userId = 1;
      const profiles = [
        { id: 1, name: 'Profile 1', user: { id: userId } } as Profile,
        { id: 2, name: 'Profile 2', user: { id: userId } } as Profile,
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(profiles);

      expect(await service.findAllProfilesByUserId(userId)).toEqual(profiles);
    });

    it('should return an empty array if no profiles found', async () => {
      const userId = 1;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      expect(await service.findAllProfilesByUserId(userId)).toEqual([]);
    });
  });
});
