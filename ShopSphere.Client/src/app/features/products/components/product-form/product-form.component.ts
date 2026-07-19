import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../core/models/product.model';
import { ProductCreate } from '../../../../core/models/product-create.model';
import { ProductUpdate } from '../../../../core/models/product-update.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() product: Product | null = null;
  @Input() isSubmitting = false;

  @Output() formSubmitted = new EventEmitter<ProductCreate | ProductUpdate>();

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', [Validators.required, Validators.maxLength(50)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.product.category,
        stockQuantity: this.product.stockQuantity
      });
    }
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.formSubmitted.emit(this.productForm.getRawValue() as ProductCreate | ProductUpdate);
  }

  get title(): string {
    return this.mode === 'create' ? 'Create Product' : 'Edit Product';
  }

  get subtitle(): string {
    return this.mode === 'create'
      ? 'Add a new product to your catalog with all essential details.'
      : 'Update product information and keep your catalog accurate.';
  }
}