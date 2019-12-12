import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-action') showAction = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
