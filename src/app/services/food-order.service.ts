import { FoodOrder } from 'src/app/models/FoodOrder';
import { Order } from './../models/Order';
import { Food } from './../models/food';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

  constructor(private http: HttpClient, private userService: UsersService) { }

  CreateFoodOrder(food: Food, order: Order, quantity?: number, comments?: string): Promise<FoodOrder> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    let foodOrder: FoodOrder = {
      id: null,
      foodId: food.foodId,
      orderId: order.id,
      quantity: quantity || 1,
      comments,
      subTotal: food.price * quantity
    };
    return this.http.post<FoodOrder>(environment.api + '/foodOrders?access_token=' + encodeURIComponent(token), foodOrder).toPromise();
  }

  GetAFoodOrder(id: number): Promise<FoodOrder> {
    return this.http.get<FoodOrder>(environment.api + '/foodOrders/' + id).toPromise();
  }

  updateOrder(foodOrder: FoodOrder): Promise<FoodOrder> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.put<FoodOrder>(environment.api + '/foodOrders/' + foodOrder.id + '?access_token=' + encodeURIComponent(token), foodOrder).toPromise();
  }

  deleteFoodOrder(id: number): Promise<any> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.delete(environment.api + '/foodOrders/' + id + '?access_token=' + encodeURIComponent(token)).toPromise();
  }

}
