import { Component, AfterViewChecked, Input, OnInit } from '@angular/core';
import { Order, StatusEnum } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal-btn.component.html',
  styleUrls: ['./paypal-btn.component.css']
})
export class PaypalBtnComponent implements OnInit {
  
  @Input() order: Order;
  
  addScript: boolean = false;
  paypalLoad: boolean = true;

  // Account: 
  // 7+,DMv*V
  // 7+,DMv*V

  constructor(private orderService: OrdersService, private router: Router) { }

  ngOnInit(): void{
      paypal.Buttons({
        createOrder: (data, actions) => {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: parseFloat(this.order.total.toString()),
                currency_code: "EUR",
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(async (details) => {
            this.order.status = StatusEnum.UNDELIVERED;
            this.orderService.updateOrder(this.order);
            this.orderService.cleanCart();
            this.router.navigate(['/thank-you']);
          });
        }
      }).render('#paypal-button-container');
      this.paypalLoad = true;
  }
  
}
