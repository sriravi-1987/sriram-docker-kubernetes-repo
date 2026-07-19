import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product } from '../../../../core/models/product.model';
import { ProductUpdate } from '../../../../core/models/product-update.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-edit-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductFormComponent],
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.scss'
})
export class EditProductPageComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isSubmitting = false;
  isLoading = true;
  errorMessage = '';
  product: Product | null = null;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid product id.';
      this.isLoading = false;
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load product details.';
        this.isLoading = false;
      }
    });
  }

  onUpdateProduct(payload: ProductUpdate): void {
    if (!this.product) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.productService.updateProduct(this.product.id, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to update product. Please try again.';
      }
    });
  }
}