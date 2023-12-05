import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({
    type: String,
    description: `Product's title`,
    example: 'Book 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    description: `Product's author`,
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({
    type: String,
    description: `Product's price`,
    example: 30.4,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: string;

  @ApiProperty({
    type: String,
    description: `Product's description`,
    example: 'This is book 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    description: `Product's category`,
    example: 'Science & Fiction',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  image?: string;
}
