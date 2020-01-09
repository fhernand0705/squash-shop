import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { AppUser } from 'src/app/shared/models/app-user';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  orders$;
  appUser: AppUser;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.orders$ = this.orderService.getOrders();
   }
}
