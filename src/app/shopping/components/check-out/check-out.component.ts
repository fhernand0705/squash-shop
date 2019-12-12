import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
