import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$
                            .subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let userOrder = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', userOrder.key]);
  }

}
