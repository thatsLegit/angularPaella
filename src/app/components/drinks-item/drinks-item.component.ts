import { drinks } from './../../models/drinks';
import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-drinks-item',
  templateUrl: './drinks-item.component.html',
  styleUrls: ['./drinks-item.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class DrinksItemComponent implements OnInit {
  @Input() drink: drinks;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
  }

  addOrder(){
    this.ordersService.addOrder(new Date(), 1, this.drink.price, this.drink.name, this.drink.image);
    this.ordersService.AddNumOrders();
  }

}
