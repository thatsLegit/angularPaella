import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  drinks: Food[];

  constructor(private foodService:FoodService) {
    // this.drinksService.getDrinks().subscribe(drinks => this.drinks=drinks);
   }

  ngOnInit() {
    // this.drinksService.getDrinks().subscribe(drinks => this.drinks=drinks);
  }

}
