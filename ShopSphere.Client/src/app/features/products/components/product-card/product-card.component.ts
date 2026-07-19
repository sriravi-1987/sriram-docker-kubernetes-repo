import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit(this.product.id);
  }

  get stockLabel(): string {
    if (this.product.stockQuantity <= 0) {
      return 'Out of Stock';
    }

    if (this.product.stockQuantity <= 5) {
      return 'Low Stock';
    }

    return 'In Stock';
  }

  get stockClass(): string {
    if (this.product.stockQuantity <= 0) {
      return 'danger';
    }

    if (this.product.stockQuantity <= 5) {
      return 'warning';
    }

    return 'success';
  }
}