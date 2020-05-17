import { Order, StatusEnum } from '../../../models/order';
import { Component, OnInit } from '@angular/core';
import { FoodOrder } from 'src/app/models/FoodOrder';
import { FoodOrderService } from 'src/app/services/food-order.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/models/food';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { PrivilegeEnum, User } from 'src/app/models/user';

@Component({
  selector: 'app-order-historic',
  templateUrl: './order-historic.component.html',
  styleUrls: ['./order-historic.component.css']
})
export class OrderHistoricComponent implements OnInit {
  orders: Array<Order>;

  isAdmin: boolean;

  polishedOrders: Array<{
    order: Order,
    user: User,
    foodOrders: Array<{
      food: Food,
      details: FoodOrder
    }>
  }>;

  polishedOrdersDisplayed: Array<{
    order: Order,
    user: User,
    foodOrders: Array<{
      food: Food,
      details: FoodOrder
    }>
  }>;

  currentPage: number;
  paginationLength: number;
  numberOfItems: number;

  isCollapsed: Array<boolean>;

  statuses = ['UNDELIVERED', 'DELIVERED'];

  loading: boolean;


  constructor(private ordersService: OrdersService, private foodOrderService: FoodOrderService, private foodService: FoodService, private userService: UsersService) { }

  async ngOnInit() {
    this.loading = true;

    this.polishedOrders = [];
    this.isCollapsed = [];

    if(this.userService.user.privilege === PrivilegeEnum.ADMIN){
      this.orders = await this.ordersService.getOrders();
    } else {
      this.orders = await this.ordersService.getOrders(null, null, this.userService.user.email);
    }

    for(let order of this.orders){
      this.isCollapsed.push(true);
      const foodOrders = await this.foodOrderService.getFoodOrderByOrderId(order.id);
      try{
        this.polishedOrders.push({
          order: order,
          user: await this.userService.getCustomerById(order.userID),
          foodOrders: []
        });
      } catch(e){
        this.polishedOrders.push({
          order: order,
          user: await this.userService.getAdminById(order.userID),
          foodOrders: []
        });
      }
      for(let fo of foodOrders){
        this.polishedOrders[this.polishedOrders.length - 1].foodOrders.push({
          details: fo,
          food: await this.foodService.getFoodById(fo.foodId)
        })
      }
    }

    this.polishedOrdersDisplayed = this.polishedOrders.slice(0, 10);

    this.currentPage = 1;
    this.paginationLength = 10;
    this.numberOfItems = this.orders.length;

    this.isAdmin = this.userService.user.privilege === PrivilegeEnum.ADMIN;

    this.loading = false;
  }

  async onUpdate(order: Order, status: StatusEnum) {
    this.loading = true;
    order.status = status;
    await this.ordersService.updateOrder(order);
    this.ngOnInit();
  }

  pageChanged(event){
    this.polishedOrdersDisplayed = this.polishedOrders.slice((event.page - 1) * event.itemsPerPage, ((event.page - 1) * event.itemsPerPage) + event.itemsPerPage);
  }

}
