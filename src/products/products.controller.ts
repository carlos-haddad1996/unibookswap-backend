import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Gets all Products' })
  @ApiResponse({ status: HttpStatus.OK, type: [ProductDTO] })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getAll() {
    return this.productService.getAllProducts();
  }
}
