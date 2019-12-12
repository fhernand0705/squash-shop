import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product.model';
import { map, first } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((cart: { items }) => new ShoppingCart(cart.items))
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(first())
      .subscribe((item: any) => {
        let quantity = (item.payload.child('/quantity').val() || 0) + change;
        if (quantity === 0) item$.remove();
        if (quantity) item$.update({
            brand: product.brand,
            price: product.price,
            imageUrl: product.imageUrl,
            item: product.item || null,
            quantity: quantity
          });
      })
  }
}
