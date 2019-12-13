import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = this.authService.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
      
  }
}
