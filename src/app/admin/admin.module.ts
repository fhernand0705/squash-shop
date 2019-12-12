import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataTableModule } from 'angular7-data-table';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
