import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Storage } from '@google-cloud/storage';
import config from '../../config/google-cloud-storage.config';
@Injectable()
export class BooksService {
  private storage = new Storage({
    projectId: config.projectId,
    keyFilename: config.keyFileName,
  });

  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    bookData: BookDto,
    picture: Express.Multer.File,
  ): Promise<CreateBookDto> {
    try {
      console.log(picture);

      const bucket = this.storage.bucket(config.projectId);
      const fileName = `${userId}-${Date.now()}-${picture.originalname}`;
      const file = bucket.file(fileName);

      const fileBuffer = picture.buffer;

      await file.save(fileBuffer, {
        metadata: {
          contentType: picture.mimetype,
        },
      });

      const pictureUrl = `https://storage.googleapis.com/${config.projectId}/${fileName}`;

      const createdBook = await this.prisma.book.create({
        data: {
          userId,
          ...bookData,
          image: pictureUrl,
        },
      });

      return createdBook;
    } catch (error: any) {
      throw new Error('Failed to create book');
    }
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  // findOne(id: number) {
  //   return this.prisma.book.findFirst({ where: { id } });
  // }

  async findBooksByUserId(userId: string) {
    return this.prisma.book.findMany({ where: { userId: parseInt(userId) } });
  }

  async getAuthors() {
    try {
      const authorsResponse = await this.prisma.book.findMany({
        select: {
          author: true,
        },
      });

      const authors = [...new Set(authorsResponse.map((book) => book.author))];
      return authors;
    } catch (error: any) {
      throw new Error(`Error at getAuthors() method: ${error.message}`);
    }
  }

  async getCategories() {
    try {
      const categoriesResponse = await this.prisma.book.findMany({
        select: {
          category: true,
        },
      });

      const categories = [
        ...new Set(categoriesResponse.map((book) => book.category)),
      ];
      return categories;
    } catch (error: any) {
      throw new Error(`Error at getCategories() method: ${error.message}`);
    }
  }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return this.prisma.book.update({
  //     where: { id },
  //     data: updateBookDto,
  //   });
  // }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
