import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get itemsTotalCount() {
    let count = 0;
    for (let productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }
}
