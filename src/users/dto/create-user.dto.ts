import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({ example: 'Fulano de Tal', description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'Data de nascimento do usuário',
  })
  @IsString()
  @IsNotEmpty()
  birthDate: string;
}
