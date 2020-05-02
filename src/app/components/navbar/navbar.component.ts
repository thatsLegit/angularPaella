import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class NavbarComponent implements OnInit {
  ordersCount: Number;

  constructor(private ordersService: OrdersService) { 
    this.ordersService.number$.subscribe(number => this.ordersCount=number);
  }

  ngOnInit() {
    this.ordersService.number$.subscribe(number => this.ordersCount=number);
  }

}