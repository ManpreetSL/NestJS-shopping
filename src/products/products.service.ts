import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id = uuidv4();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }

  getAllProducts() {
    return [...this.products];
  }
}
