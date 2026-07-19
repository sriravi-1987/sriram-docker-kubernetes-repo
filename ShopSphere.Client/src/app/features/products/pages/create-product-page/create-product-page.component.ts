import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductCreate } from '../../../../core/models/product-create.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductFormComponent],
  templateUrl: './create-product-page.component.html',
  styleUrl: './create-product-page.component.scss'
})
export class CreateProductPageComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  isSubmitting = false;
  errorMessage = '';

  onCreateProduct(payload: ProductCreate): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.productService.createProduct(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to create product. Please try again.';
      }
    });
  }
}