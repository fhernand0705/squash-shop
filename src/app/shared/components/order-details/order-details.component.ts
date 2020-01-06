import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  userOrders = {};
  id: string;
  adminUrl: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.orderService.getOrderId(this.id)
      .valueChanges()
      .pipe(first())
      .subscribe(orders => this.userOrders = orders);

    this.adminUrl = this.location.path();
  }


}
