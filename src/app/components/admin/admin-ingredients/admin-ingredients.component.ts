import { Ingredient } from './../../../models/ingredient';
import { IngredientsService } from './../../../services/ingredients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {
  ingredients: Array<Ingredient>;
  name: String;
  quantity: number;

  constructor(private ingredientsService:IngredientsService) {
    // this.ingredientsService.getIngredients().subscribe(ingredients => this.ingredients=ingredients);
   }

  ngOnInit() {
    // this.ingredientsService.getIngredients().subscribe(ingredients => this.ingredients=ingredients);
  }

  addIngredient(){
    // this.ingredientsService.addIngredient(this.name, this.quantity);
  }

  onDelete(id:String){
    // this.ingredientsService.onDelete(id);
  }

  onUpdate(id:String, sign:String){
    // this.ingredientsService.onUpdate(id, sign);
  }

}
