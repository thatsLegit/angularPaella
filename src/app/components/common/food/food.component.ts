import { Food } from '../../../models/food';
import { FoodService } from '../../../services/food.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  food: Array<Food>;
  foodDisplayed: Array<Food>;

  currentPage: number;
  paginationLength: number;
  numberOfItems: number;

  constructor(private foodService:FoodService) { 

  }

  async ngOnInit() {
    this.food = await this.foodService.getFood(null, null, null, true);
    this.currentPage = 1;
    this.paginationLength = 9;
    this.numberOfItems = this.food.length;
    this.foodDisplayed = this.food.slice((this.currentPage - 1) * this.paginationLength, ((this.currentPage - 1) * this.paginationLength) + this.paginationLength);
  }

  pageChanged(event){
    this.foodDisplayed = this.food.slice((event.page - 1) * event.itemsPerPage, ((event.page - 1) * event.itemsPerPage) + event.itemsPerPage);
  }

}
