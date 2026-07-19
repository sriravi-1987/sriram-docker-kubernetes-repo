import { Routes } from '@angular/router';
import { ProductsPageComponent } from './features/products/pages/products-page/products-page.component';
import { CreateProductPageComponent } from './features/products/pages/create-product-page/create-product-page.component';
import { EditProductPageComponent } from './features/products/pages/edit-product-page/edit-product-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/new', component: CreateProductPageComponent },
  { path: 'products/:id/edit', component: EditProductPageComponent }
];