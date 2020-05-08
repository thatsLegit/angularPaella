import { Order, StatusEnum } from './../models/order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { FoodOrder } from '../models/FoodOrder';

@Injectable()
export class OrdersService {

  cart: Array<FoodOrder>;

  constructor(private http: HttpClient, private userService: UsersService) {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
      this.cart = storage;
    } else {
      this.cart = [];
    }
  }

  getOrders(clientLastName?: string, clientName?: string, email?: string, foodName?: string, status?: StatusEnum): Promise<Array<Order>> {
    let url = environment.api + '/orders';
    let modified = false;

    if (clientLastName) {
      modified = true;
      url += '?clientLastName=' + encodeURIComponent(clientLastName);
    }

    if (clientName) {
      if (!modified) {
        modified = true;
        url += '?clientName=' + encodeURIComponent(clientName);
      } else {
        url += '&clientName=' + encodeURIComponent(clientName);
      }
    }

    if (email) {
      if (!modified) {
        modified = true;
        url += '?email=' + encodeURIComponent(email);
      } else {
        url += '&email=' + encodeURIComponent(email);
      }
    }

    if (foodName) {
      if (!modified) {
        modified = true;
        url += '?foodName=' + encodeURIComponent(foodName);
      } else {
        url += '&foodName=' + encodeURIComponent(foodName);
      }
    }

    if (status) {
      if (!modified) {
        modified = true;
        url += '?status=' + encodeURIComponent(status);
      } else {
        url += '&status=' + encodeURIComponent(status);
      }
    }

    return this.http.get<Array<Order>>(url).toPromise();
  }

  getOrderById(id: number): Promise<Order> {
    return this.http.get<Order>(environment.api + '/orders/' + id).toPromise();
  }

  createOrder(order: Order): Promise<Order> {
    order.id = null;
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.post<Order>(environment.api + '/orders?access_token=' + encodeURIComponent(token), order).toPromise();
  }

  updateOrder(order: Order): Promise<Order> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.put<Order>(environment.api + '/orders/' + order.id + '?access_token=' + encodeURIComponent(token), order).toPromise();
  }

  deleteOrder(id: number): Promise<any> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.delete(environment.api + '/orders/' + id + '?access_token=' + encodeURIComponent(token)).toPromise();
  }

  addToCart(foodOrder: FoodOrder) {
    this.cart.push(foodOrder);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  cleanCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }


}
