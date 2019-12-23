import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  adminOrders$;
  id: string;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.adminOrders$ = this.authService.user$
      .pipe(switchMap(u => orderService.getOrdersByUser(u.uid))
    );
  }

}
