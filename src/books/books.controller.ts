import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
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

  @Get(':id')
  @ApiOperation({ summary: 'Gets book by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

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

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update book by Id' })
  // @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  // @ApiBadRequestResponse({ description: 'Bad Request' })
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(+id, updateBookDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes book by Id' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
