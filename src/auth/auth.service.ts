import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(user: CreateUserDto) {
    try {
      let loggedUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!loggedUser) {
        loggedUser = await this.prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            picture: user.picture,
          },
        });
        return loggedUser;
      }
      return loggedUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
