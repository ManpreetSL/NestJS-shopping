import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProductById(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productsService.updateProduct(id, title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
  }
}
