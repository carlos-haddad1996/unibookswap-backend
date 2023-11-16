import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a Books' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
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

  @Patch(':id')
  @ApiOperation({ summary: 'Update book by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateBookDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes book by Id' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
