import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = []
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productService.getAll()
      .pipe(
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

}
