import { OrdersService } from './../../services/orders.service';
import { Order } from './../../models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<Order>;

  constructor(private ordersService: OrdersService) {
    // this.ordersService.orders$.subscribe(orders => this.orders = orders);
  }

  ngOnInit() {
    // this.ordersService.orders$.subscribe(orders => this.orders = orders);
  }

  onDelete(id: String) {
    // this.ordersService.deleteOrder(id);
  }

  onUpdate(id: String, sign: String) {
    // this.ordersService.updateOrders(id, sign);
  }

  updateNumberCount(quantity: number) {
    // this.ordersService.SubstractNumOrders(quantity);
  }

}
