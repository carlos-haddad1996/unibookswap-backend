import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: `User's name`,
    example: 'John Doe',
  })
  @IsString()
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
    description: `Product's password`,
    example: 'password',
  })
  @IsString()
  password: string;
}
