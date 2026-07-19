import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCreate } from '../models/product-create.model';
import { ProductUpdate } from '../models/product-update.model';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_ENDPOINTS.products);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_ENDPOINTS.products}/${id}`);
  }

  createProduct(payload: ProductCreate): Observable<Product> {
    return this.http.post<Product>(API_ENDPOINTS.products, payload);
  }

  updateProduct(id: string, payload: ProductUpdate): Observable<void> {
    return this.http.put<void>(`${API_ENDPOINTS.products}/${id}`, payload);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.products}/${id}`);
  }
}