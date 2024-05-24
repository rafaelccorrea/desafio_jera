import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'Nome do perfil' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
