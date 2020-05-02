import { food } from './../../models/food';
import { FoodService } from './../../services/food.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class FoodComponent implements OnInit {
  food: food[];

  constructor(private FoodService:FoodService) { 
    this.FoodService.getFood().subscribe(food => this.food = food);
  }

  //subscribe to observable
  ngOnInit() {
    this.FoodService.getFood().subscribe(food => this.food = food);
  }

}
