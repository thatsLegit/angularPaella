import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../models/order';
import { Component, OnInit } from '@angular/core';
import { FoodOrder } from 'src/app/models/FoodOrder';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<FoodOrder>;
  polishedOrders: Array<{
    food: Food,
    foodOrder: FoodOrder
  }>;

  loading: boolean;

  constructor(private ordersService: OrdersService, private foodOrderService: FoodOrderService, private foodService: FoodService) { }

  async ngOnInit() {
    this.loading = true;
    this.orders = this.ordersService.getCart();
    this.polishedOrders = [];
    for(let i = 0; i < this.orders.length; i++){
      this.polishedOrders.push({
        food: await this.foodService.getFoodById(this.orders[i].foodId),
        foodOrder: this.orders[i]
      });
    }
    this.loading = false;
  }

  onDelete(index: number) {
    this.ordersService.removeFromCart(index);
    this.ngOnInit();
  }

  onUpdate(index: number, sign: String) {
    this.loading = true;
    this.orders[index].quantity = sign === 'plus' ? (this.orders[index].quantity + 1) :  (this.orders[index].quantity - 1);
    this.ordersService.updateCart(this.orders, index);
    this.ngOnInit();
  }

}
