import { Ingredient } from './../../../models/ingredient';
import { IngredientsService } from './../../../services/ingredients.service';
import { Food } from './../../../models/food';
import { FoodService } from './../../../services/food.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit {
  foods: Array<Food>;
  name: String;
  price: number;
  image: '../../../assets/img/noimage.jpg';
  ingredients: Array<Ingredient>;
  modalRef: BsModalRef;

  constructor(private foodService: FoodService, private ingredientsService:IngredientsService, private modalService: BsModalService) { 
    
    
  }

  async ngOnInit() {
    this.foods = await this.foodService.getFood();
    this.ingredients = await this.ingredientsService.getIngredients();
  }

  addFood(){
  
  }

  onDelete(id:String){
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
