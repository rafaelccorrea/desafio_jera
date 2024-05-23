import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Endereço de e-mail',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ minLength: 6, description: 'Senha do usuário' })
  @IsString()
  @MinLength(6)
  password: string;
}
