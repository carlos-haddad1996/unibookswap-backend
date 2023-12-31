import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':userId')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Creates a Books',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Param('userId') userId: string,
    @Body() createBookDto: BookDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 800000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    try {
      const createdBook = await this.booksService.create(
        parseInt(userId),
        createBookDto,
        image,
      );
      return createdBook;
    } catch (error: any) {
      throw new Error('failed to create a book');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets all Books' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateBookDto] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findAll() {
    return this.booksService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Gets book by Id' })
  // @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  // @ApiBadRequestResponse({ description: 'Bad Request' })
  // findOne(@Param('id') id: string) {
  //   return this.booksService.findOne(+id);
  // }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get list of books by userId' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateBookDto] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getBooksByUserId(@Param('userId') userId: string) {
    try {
      return this.booksService.findBooksByUserId(userId);
    } catch (error: any) {
      throw Error(`Failed to get books: ${error.message}`);
    }
  }

  @Get('authors')
  @ApiOperation({ summary: 'Get list of authors' })
  @ApiResponse({ status: HttpStatus.OK, type: [String] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getAuthors() {
    try {
      return this.booksService.getAuthors();
    } catch (error: any) {
      throw Error(`Failed to get authors: ${error.message}`);
    }
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get list of categories' })
  @ApiResponse({ status: HttpStatus.OK, type: [String] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getCategories() {
    try {
      return this.booksService.getCategories();
    } catch (error: any) {
      throw Error(`Failed to get categories: ${error.message}`);
    }
  }

  @Put(':id/user/:userId')
  @ApiOperation({ summary: 'Updates book by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBookDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateBookDto?: UpdateBookDto,
  ) {
    try {
      return this.booksService.updateBook(+id, updateBookDto, parseInt(userId));
    } catch (error: any) {
      throw Error(`Failed to update book: ${error.message}`);
    }
  }

  @Delete(':id/user/:userId')
  @ApiOperation({ summary: 'Deletes book by Id' })
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.booksService.remove(+id, parseInt(userId));
  }
}
