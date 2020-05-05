import { Ingredient } from './../../../models/ingredient';
import { IngredientsService } from './../../../services/ingredients.service';
import { Food } from './../../../models/food';
import { FoodService } from './../../../services/food.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientFood } from 'src/app/models/IngredientFood';
import { FoodAndIngredients } from 'src/app/models/FoodAndIngredients';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit {
  foods: Array<Food>;
  categories: Array<Category>;
  name: String;
  price: number;
  image: '../../../assets/img/noimage.jpg';
  ingredients: Array<Ingredient>;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  
  itemsPerSlide = 3;
  singleSlideOffset = false;
  slides: Array<{image: string, ingredientFood: IngredientFood}>;

  newFoodForm: FormGroup;
  newIngredientForm: FormGroup;

  newIngredient: Ingredient;

  loading: boolean;


  constructor(private foodService: FoodService, private ingredientsService:IngredientsService, private categoryService: CategoryService, private modalService: BsModalService, private formBuilder: FormBuilder,) { 
    
    
  }

  async ngOnInit() {
    this.loading = true;
    this.createForms();
    this.slides = [];
    this.newIngredient = null;
    this.foods = await this.foodService.getFood();
    this.ingredients = await this.ingredientsService.getIngredients();
    this.categories = await this.categoryService.getCategories();
    this.loading = false;
  }

  createForms(){
    this.newFoodForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      active: [null, Validators.required],
      isDishOfDay: [null, Validators.required],
      imageURL: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
    
    this.newIngredientForm = this.formBuilder.group({
      ingredientId: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      unit: [null, Validators.required]
    });

    this.newIngredientForm.controls['ingredientId'].valueChanges
    .subscribe((value) => this.newIngredient = this.ingredients.find((ing) => ing.ingredientID === value));
    
  }

  async addFood(){

    const sendable: FoodAndIngredients = {
      food: this.newFoodForm.value,
      ingredientFoods: []
    };

    for(let ingredient of this.slides){
      sendable.ingredientFoods.push(ingredient.ingredientFood);
    }

    try{
      const answer = await this.foodService.createFood(sendable);
      this.ngOnInit();
    } catch(e) {
      alert(e);
    }
  }

  async onDelete(id:String){
    try{
      await this.foodService.deleteFood(id);
      this.ngOnInit();
    } catch(e) {
      alert(e);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg'
    });
    this.modalRef.setClass
  }
  
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      class: 'second',
      backdrop: true
    });
    document.getElementsByClassName('second')[0].parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  }

  addNewIngredient(){
    this.slides.push({
      image: this.newIngredient.imageURL,
      ingredientFood: {
        foodId: null,
        id: null,
        ...this.newIngredientForm.value
      }
    });
  }

  deleteNewIngredient(index: number){
    this.slides.splice(index, 1);
  }

}
