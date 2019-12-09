import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.retrieveProducts();
  }

  private retrieveProducts() {
    this.productService
      .getAll()
      .pipe(
          switchMap((products: Product[]) => {
            this.products = products;
            return this.route.queryParamMap;
          }))
          .subscribe(params => {
              this.category = params.get('category');
              this.applyFilter();
          })
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
