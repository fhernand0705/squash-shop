import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
