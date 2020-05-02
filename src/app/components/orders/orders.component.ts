import { OrdersService } from './../../services/orders.service';
import { orders } from './../../models/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class OrdersComponent implements OnInit {
  orders: orders[];

  constructor(private ordersService: OrdersService) {
    this.ordersService.orders$.subscribe(orders => this.orders = orders);
  }

  ngOnInit() {
    this.ordersService.orders$.subscribe(orders => this.orders = orders);
  }

  onDelete(id: String) {
    this.ordersService.deleteOrder(id);
  }

  onUpdate(id: String, sign: String) {
    this.ordersService.updateOrders(id, sign);
  }

  updateNumberCount(quantity: number) {
    this.ordersService.SubstractNumOrders(quantity);
  }

}
