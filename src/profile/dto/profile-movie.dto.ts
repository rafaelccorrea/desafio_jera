import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMovieDto {
  @ApiProperty({ description: 'ID do filme' })
  @IsNumber()
  @IsNotEmpty()
  readonly external_id: number;

  @ApiProperty({ description: 'Nome do filme' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
