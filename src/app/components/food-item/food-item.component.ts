import { OrdersService } from './../../services/orders.service';
import { Food } from './../../models/food';
import { Component, OnInit, Input } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
  @Input() food: Food;
  ingredients: Array<Ingredient>;
  available: boolean;

  constructor(private ordersService: OrdersService, private ingredientsService:IngredientsService) {
    // this.ingredientsService.getIngredients().subscribe(ingredient => this.ingredients = ingredient);
   }

  ngOnInit() {
    // this.ingredientsService.getIngredients().subscribe(ingredient => this.ingredients = ingredient);
    // this.available = this.checkIfAvailable();
  }

  addOrder(){
    // this.ordersService.addOrder(new Date(), 1, this.food.price, this.food.name, this.food.image);
    // this.ordersService.AddNumOrders();
  }

  checkIfAvailable():boolean{
    // for (let i=0;i<this.ingredients.length;++i){
    //   for(let j=0;j<this.food.ingredients.length;++j){
    //     if(this.food.ingredients[j].name==this.ingredients[i].name){
    //       if(this.ingredients[i].quantity<this.food.ingredients[j].quantity){
    //         return false;
    //       }
    //     }
    //   }
    // }
    return true;
  }

}
