import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'Profile name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  userId: number;
}
