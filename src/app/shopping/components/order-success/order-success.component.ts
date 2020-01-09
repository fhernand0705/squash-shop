import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent {
  orders;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.orderService.getOrderId(this.id)
        .valueChanges()
        .pipe(first())
        .subscribe(orders => {
          if (orders) this.orders = orders;
        });
  }
}
