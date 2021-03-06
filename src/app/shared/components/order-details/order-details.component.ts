import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  orderDetails;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.orderService.getOrderId(this.id)
      .valueChanges()
      .pipe(first())
      .subscribe(orders => {
        if (orders) this.orderDetails = orders;
      });
  }

}
