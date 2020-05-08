import { OrdersService } from '../../../services/orders.service';
import { Food } from '../../../models/food';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientFood } from 'src/app/models/IngredientFood';
import { FoodIngredientService } from 'src/app/services/food-ingredient.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodOrder } from 'src/app/models/FoodOrder';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
  @Input() food: Food;
  category: Category;
  modalRef: BsModalRef;
  
  itemsPerSlide = 3;
  singleSlideOffset = false;
  slides: Array<{image: string, title: string, ingredientFood: IngredientFood}>;

  orderFoodForm: FormGroup;

  loading: boolean;

  constructor(private ordersService: OrdersService, private ifService: FoodIngredientService, private ingredientService: IngredientsService, private modalService: BsModalService, private categoryService: CategoryService, private formBuilder: FormBuilder) {
  }

  async ngOnInit() {
    this.loading = true;
    this.buildForm();
    const ifLinks = await this.ifService.getIngredientFood(this.food.foodId);
    
    this.slides = [];
    for(let ifLink of ifLinks){
      const ingredient = await this.ingredientService.getIngredientById(ifLink.ingredientId);
      this.slides.push({
        ingredientFood: ifLink,
        image: ingredient.imageURL,
        title: ingredient.name + ': '+ifLink.quantity+' '+ifLink.unit
      });
    }

    this.category = await this.categoryService.getCategoryById(this.food.categoryId);

    this.loading = false;

  }

  buildForm(){
    this.orderFoodForm = this.formBuilder.group({
      comments: [''],
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]{0,9}?$"), Validators.min(1)]]
    });
  }

  orderFood(){
    const order: FoodOrder = {
      comments: this.orderFoodForm.value.comments,
      quantity: this.orderFoodForm.value.quantity,
      foodId: this.food.foodId,
      id: null,
      orderId: null,
      subTotal: (+this.food.price) * (+this.orderFoodForm.value.quantity)
    }

    this.ordersService.addToCart(order);
    this.orderFoodForm.reset();
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg food-modal-container'
    });
  }

}
