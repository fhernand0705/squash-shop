import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll()  { // add return type Observable<Product>[]
    return this.db.list('/products', ref => ref.orderByChild('brand'))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => ({key: a.key, ...a.payload.val()})))
    )
  }

  getProduct(productId) { // add return type Observable<Product>
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
