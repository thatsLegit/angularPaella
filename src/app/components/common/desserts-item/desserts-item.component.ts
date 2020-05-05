import { Ingredient } from '../../../models/ingredient';
import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-desserts-item',
  templateUrl: './desserts-item.component.html',
  styleUrls: ['./desserts-item.component.css']
})
export class DessertsItemComponent implements OnInit {
  @Input() dessert: Food;
  ingredients: Array<Ingredient>;
  available: boolean;

  constructor(private ordersService: OrdersService, private ingredientsService:IngredientsService) { 
    // this.ingredientsService.getIngredients().subscribe(ingredient => this.ingredients = ingredient);
  }

  ngOnInit() {
    // this.ingredientsService.getIngredients().subscribe(ingredient => this.ingredients = ingredient);
    // //Has to be done after the ingreds q updates.
    // //the availability doesn't get updated here
    // this.available = this.checkIfAvailable();
  }

  addOrder(){
    // this.ordersService.addOrder(new Date(), 1, this.dessert.price, this.dessert.name, this.dessert.image);
    // this.ordersService.AddNumOrders();
  }

  checkIfAvailable():boolean{
    // for (let i=0;i<this.ingredients.length;++i){
    //   for(let j=0;j<this.dessert.ingredients.length;++j){
    //     if(this.dessert.ingredients[j].name==this.ingredients[i].name){
    //       if(this.ingredients[i].quantity<this.dessert.ingredients[j].quantity){
    //         return false;
    //       }
    //     }
    //   }
    // }
    return true;
  }

}
