import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy  {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe((products: Product[]) => {
        this.filteredProducts = this.products = products
        this.initializedTable(products);
      });
  }

  private initializedTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.brand.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
