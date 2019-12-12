import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products', ref => ref.orderByChild('brand'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => ({key: a.key, ...a.payload.val()})))
    )
  }

  getProduct(productId: string) {
    return this.db.object<Product>('/products/' + productId);
  }

  update(productId: string, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
