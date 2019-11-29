import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product = {};
  id;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id)
      .valueChanges()
      .pipe(first())
      .subscribe(p => this.product = p)
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product)
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
