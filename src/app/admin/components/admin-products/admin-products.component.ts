import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy  {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe((products: Product[]) => {
        this.products = products
        this.initializeTable(products);
      });

      console.log()
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items)        
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.category.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
