import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    type: String,
    description: `Product's title`,
    example: 'Book 1',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: `Product's author`,
    example: 'John Doe',
  })
  @IsString()
  author: string;

  @ApiProperty({
    type: Number,
    description: `Product's price`,
    example: 30.4,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    description: `Product's description`,
    example: 'This is book 1',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    description: `Product's category`,
    example: 'Science & Fiction',
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: String,
    description: `Product's image`,
    example: 'Book 1 image',
  })
  @IsString()
  image: string;
}
