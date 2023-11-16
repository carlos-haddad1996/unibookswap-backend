import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty({
    type: Number,
    description: `Product's id`,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  id?: number | null;

  @ApiProperty({
    type: Number,
    description: `Product's title`,
    example: 'Book 1',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
    description: `Product's price`,
    example: 30.4,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: Number,
    description: `Product's description`,
    example: 'This is book 1',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: `Product's category`,
    example: 'Science & Fiction',
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: Number,
    description: `Product's image`,
    example: 'Book 1 image',
  })
  @IsString()
  image: string;
}
