import { IngredientsService } from './../../../services/ingredients.service';
import { Ingredient } from './../../../models/ingredient';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-admin-desserts',
  templateUrl: './admin-desserts.component.html',
  styleUrls: ['./admin-desserts.component.css']
})
export class AdminDessertsComponent implements OnInit {
  desserts: Array<Food>;
  name: String;
  price: number;
  image: "../../../assets/img/noimage.jpg";
  Allingredients: Array<Ingredient>;

  ingredients: Array<Ingredient> = [];
  s1: String=null; s2: String=null; s3: String=null; s4: String=null; s5: String=null;
  i1: number=null; i2: number=null; i3: number=null; i4: number=null; i5: number=null;

  constructor(private foodService:FoodService, private ingredientsService:IngredientsService) {
    // this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
    // this.ingredientsService.getIngredients().subscribe(ingredients => this.Allingredients = ingredients);
   }

  ngOnInit() {
    // this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
  }

  addDessert(){
    // if(this.s1 && this.i1){
    //   this.ingredients.push({
    //     id: uuid.v4(),
    //     name: this.s1,
    //     quantity: this.i1
    //   });
    // }
    // if(this.s2 && this.i2){
    //   this.ingredients.push({
    //     id: uuid.v4(),
    //     name: this.s2,
    //     quantity: this.i2
    //   });
    // }
    // if(this.s3 && this.i3){
    //   this.ingredients.push({
    //     id: uuid.v4(),
    //     name: this.s3,
    //     quantity: this.i3
    //   });
    // }
    // if(this.s4 && this.i4){
    //   this.ingredients.push({
    //     id: uuid.v4(),
    //     name: this.s4,
    //     quantity: this.i4
    //   });
    // }
    // if(this.s5 && this.i5){
    //   this.ingredients.push({
    //     id: uuid.v4(),
    //     name: this.s5,
    //     quantity: this.i5
    //   });
    // } 
    // if(this.ingredients.length){this.dessertsService.addDessert(this.name,this.image,this.price,this.ingredients)} 
  }

  onDelete(id:String){
    // this.dessertsService.onDelete(id);
  }

}
