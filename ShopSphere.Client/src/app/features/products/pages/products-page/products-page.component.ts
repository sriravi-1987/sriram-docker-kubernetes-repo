import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CurrencyPipe, RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  totalProducts = 0;
  totalCategories = 0;
  inventoryCount = 0;
  averagePrice = 0;

  onProductsLoaded(products: Product[]): void {
    this.totalProducts = products.length;
    this.totalCategories = new Set(products.map(x => x.category)).size;
    this.inventoryCount = products.reduce((sum, x) => sum + x.stockQuantity, 0);
    this.averagePrice = products.length
      ? products.reduce((sum, x) => sum + x.price, 0) / products.length
      : 0;
  }
}