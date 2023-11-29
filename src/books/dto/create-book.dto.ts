import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';
import { IsNumber } from 'class-validator';

export class CreateBookDto extends BookDto {
  @ApiProperty({
    type: Number,
    description: `User's title`,
    example: 'Book 1',
  })
  @IsNumber()
  userId: number;
}
