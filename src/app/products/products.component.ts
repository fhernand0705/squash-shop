import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.productService.getAll().pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return route.queryParamMap;
        }))
        .subscribe(params => {
            this.category = params.get('category');

            this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        })
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).valueChanges()
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
