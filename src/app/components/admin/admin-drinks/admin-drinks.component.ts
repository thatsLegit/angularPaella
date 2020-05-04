import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-admin-drinks',
  templateUrl: './admin-drinks.component.html',
  styleUrls: ['./admin-drinks.component.css']
})
export class AdminDrinksComponent implements OnInit {
  drinks: Array<Food>;
  name: String;
  price: number;
  image: "../../../assets/img/noimage.jpg";

  constructor(private foodService:FoodService) { 
    // this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);
  }

  ngOnInit() {
    // this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);
  }

  addDrink(){
    // this.drinksService.addDrink(this.name, this.image, this.price);
  }

  onDelete(id:String){
    // this.drinksService.onDelete(id);
  }

}
