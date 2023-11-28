import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    description: `Users's email`,
    example: 'john.doe@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: `Product's picture`,
    example: 'path to picture',
  })
  @IsString()
  @IsOptional()
  picture: string;
}
