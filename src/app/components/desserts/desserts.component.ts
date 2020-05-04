import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent implements OnInit {
  desserts: Array<Food>;

  constructor(private foodService: FoodService) { 
    // this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
  }

  ngOnInit() {
    // this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
  }

}
