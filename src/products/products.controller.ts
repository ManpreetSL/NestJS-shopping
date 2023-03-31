import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const id = this.productsService.insertProduct(title, description, price);
    return { id };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
}
