import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
