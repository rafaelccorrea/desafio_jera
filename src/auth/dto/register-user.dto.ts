import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'example@email.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ minLength: 6, description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2000-01-01', description: 'User birth date' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;
}
