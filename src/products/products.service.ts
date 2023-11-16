import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  async getAllProducts(): Promise<ProductDTO> {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      return await response.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
