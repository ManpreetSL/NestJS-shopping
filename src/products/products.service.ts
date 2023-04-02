import { Injectable, NotFoundException } from '@nestjs/common';
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

  getProductById(id: string) {
    return { ...[this.findProduct(id)] };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };

    if (id) updatedProduct.id = id;
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    const [_, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];

    if (!product)
      throw new NotFoundException(`Could not find product with ID ${id}`);

    return [product, productIndex];
  }
}
