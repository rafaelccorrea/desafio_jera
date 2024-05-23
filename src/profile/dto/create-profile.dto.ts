import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'Profile name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 123,
    description: 'User ID associated with the profile',
  })
  @IsNotEmpty()
  userId: number;
}
