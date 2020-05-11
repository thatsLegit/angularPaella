import { Order, StatusEnum } from './../models/order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { FoodOrder } from '../models/FoodOrder';
import { FoodOrderService } from './food-order.service';

@Injectable()
export class OrdersService {

  cart: Array<FoodOrder>;

  constructor(private http: HttpClient, private userService: UsersService, private foodOrderService: FoodOrderService) {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage) {
      this.cart = storage;
    } else {
      this.cart = [];
    }

    if(this.userService.user){
      this.getOrders(null, null, null, null, StatusEnum.INCART).then(async (order) =>{
        let dbOrder: any = order;
        dbOrder = dbOrder.length ? dbOrder[0] : null;
        if(dbOrder){
          this.cart = await this.foodOrderService.getFoodOrderByOrderId(dbOrder.id);
        } else {
          dbOrder = await this.createOrder({
              creation_date: new Date(),
              id: null,
              status: StatusEnum.INCART,
              total: null,
              update_date: new Date(),
              userID: this.userService.user.id
          });
          if(this.cart.length){
            for(let i = 0; i < this.cart.length; i++){
              this.cart[i].orderId = dbOrder.id;
              this.cart[i] = await this.foodOrderService.CreateFoodOrder(this.cart[i]);
            }
          }
        }      
        localStorage.setItem('cart', JSON.stringify(this.cart));
      });

    }

    this.userService.user$.subscribe(async (user) => {
      if(user){
        let dbOrder: any = await this.getOrders(null, null, null, null, StatusEnum.INCART);
        dbOrder = dbOrder.length ? dbOrder[0] : null;
        if(dbOrder){
          this.cart = await this.foodOrderService.getFoodOrderByOrderId(dbOrder.id);
        } else {
          dbOrder = await this.createOrder({
            creation_date: new Date(),
            status: StatusEnum.INCART,
            total: null,
            update_date: new Date(),
            userID: this.userService.user.id
          });
          
          if(this.cart.length){
            for(let i = 0; i < this.cart.length; i++){
              this.cart[i].orderId = dbOrder.id;
              this.cart[i] = await this.foodOrderService.CreateFoodOrder(this.cart[i]);
            }
          }
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    })
  }

  async getOrders(clientLastName?: string, clientName?: string, email?: string, foodName?: string, status?: StatusEnum): Promise<Array<Order>> {
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
    
    if (this.userService.token) {
      if (!modified) {
        modified = true;
        url += '?access_token=' + encodeURIComponent(this.userService.token);
      } else {
        url += '&access_token=' + encodeURIComponent(this.userService.token);
      }
    } else {
      return [];
    }

    return this.http.get<Array<Order>>(url).toPromise();
  }

  getOrderById(id: number): Promise<Order> {
    const token = this.userService.token;
    if (!token) {
      return null;
    }
    return this.http.get<Order>(environment.api + '/orders/' + id + '?access_token=' + encodeURIComponent(token)).toPromise();
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

  async addToCart(foodOrder: FoodOrder) {

    if(this.userService.user){
      let orderInCart: any = await this.getOrders(null, null, null, null, StatusEnum.INCART);
      orderInCart = orderInCart.length ? orderInCart[0] : null;
      
      if(!orderInCart){
        orderInCart = await this.createOrder({
          creation_date: new Date(),
          id: null,
          status: StatusEnum.INCART,
          total: null,
          update_date: new Date(),
          userID: this.userService.user.id
        });
        for(let i = 0; i < this.cart.length; i++){
          this.cart[i].orderId = orderInCart.id;
          this.cart[i] = await this.foodOrderService.CreateFoodOrder(this.cart[i]);
        }
      }

      foodOrder.orderId = orderInCart.id;

      const newFoodOrder = await this.foodOrderService.CreateFoodOrder(foodOrder);

      this.cart.push(newFoodOrder);
    } else {
      this.cart.push(foodOrder);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  async updateCart(cart: Array<FoodOrder>, index: number){

    if(this.userService.user){
      let orderInCart: any = await this.getOrders(null, null, null, null, StatusEnum.INCART);
      orderInCart = orderInCart.length ? orderInCart[0] : null;
      
      if(!orderInCart){
        orderInCart = await this.createOrder({
          creation_date: new Date(),
          id: null,
          status: StatusEnum.INCART,
          total: null,
          update_date: new Date(),
          userID: this.userService.user.id
        });
        for(let i = 0; i < cart.length; i++){
          cart[i].orderId = orderInCart.id;
          cart[i] = await this.foodOrderService.CreateFoodOrder(cart[i]);
        }
      } else {
        cart[index] = await this.foodOrderService.updateOrder(cart[index]);
      }


    }

    this.cart = cart;

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  async removeFromCart(index: number){
    const deleted = this.cart.splice(index,1);

    if(this.userService.user){
      let orderInCart: any = await this.getOrders(null, null, null, null, StatusEnum.INCART);
      orderInCart = orderInCart.length ? orderInCart[0] : null;
      
      if(!orderInCart){
        orderInCart = await this.createOrder({
          creation_date: new Date(),
          id: null,
          status: StatusEnum.INCART,
          total: null,
          update_date: new Date(),
          userID: this.userService.user.id
        });
        for(let i = 0; i < this.cart.length; i++){
          this.cart[i].orderId = orderInCart.id;
          this.cart[i] = await this.foodOrderService.CreateFoodOrder(this.cart[i]);
        }
      } else {
        await this.foodOrderService.deleteFoodOrder(deleted[0].id);
      }

    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  cleanCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  getCart(){
    return this.cart;
  }


}
