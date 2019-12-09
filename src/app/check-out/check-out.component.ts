import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart.model';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  userId: string;
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$
                            .subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let userOrder = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', userOrder.key]);
  }
}
