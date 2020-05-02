import { orders } from './../models/orders';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable()
export class OrdersService {
  ord: orders[] = [];
  public orders$ = new BehaviorSubject(this.ord);
  public number$ = new BehaviorSubject(0);

  constructor() { }

  //GET ORDER NUMBER
  numOrders(): Observable<number> {
    return this.number$;
  }

  //UPDATE ORDER NUMBER
  AddNumOrders() {
    this.number$.next(this.number$.getValue() + 1);
  }
  SubstractNumOrders(quantity: number) {
    this.number$.next(this.number$.getValue() - quantity);
  }

  //GET ORDERS
  getOrders(): Observable<orders[]> {
    return this.orders$;
  }

  //UPDATE ORDERS QUANTITY
  updateOrders(id: String, sign: String) {
    this.ord.forEach(order => {
      if (order.id == id) {
        if (sign == "minus") {
          if (order.quantity > 1) {
            order.quantity--;
            order.totalPrice -= order.price;
          }
        } else {
          order.quantity++;
          order.totalPrice += order.price;
        }
      }
    });
    this.orders$.next(this.ord);
  }

  //DELETE ORDER
  deleteOrder(id: String) {
    this.ord = this.ord.filter(order => order.id != id);
    this.orders$.next(this.ord);
  }

  //POST ORDER
  addOrder(date: Date, quantity: number, price: number, name: String, image: String) {
    for (let order of this.ord) {
      if (name == order.name) {
        order.quantity++;
        order.totalPrice += order.price;
        return;
      }
    }
    const id = uuid.v4();
    let totalPrice = price;
    let o: orders = {
      id, date, name, quantity, price, totalPrice, image
    };
    this.ord.push(o);
  }

}
