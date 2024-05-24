import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMovieDto {
  @ApiProperty({ example: 99, description: 'ID do filme' })
  @IsNumber()
  @IsNotEmpty()
  readonly external_id: number;

  @ApiProperty({ example: 'Duro de morrer 99', description: 'Nome do filme' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'Doce', description: 'Categoria' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
