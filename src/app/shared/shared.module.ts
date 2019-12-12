import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from 'src/app/shared/product-card/product-card.component';
import { ProductQuantityComponent } from 'src/app/shared/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular7-data-table';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule,
    NgbModule
  ],

})
export class SharedModule { }
