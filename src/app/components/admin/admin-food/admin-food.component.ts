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
import { NgxSpinnerService } from 'ngx-spinner';
import { FoodIngredientService } from 'src/app/services/food-ingredient.service';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit {
  foods: Array<Food>;
  foodsDisplayed: Array<Food>;
  categories: Array<Category>;
  image: '../../../assets/img/noimage.jpg';
  ingredients: Array<Ingredient>;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  itemsPerSlide = 3;
  singleSlideOffset = false;
  loadingCarousel: boolean = false;
  slides: Array<{image: string, title: string, ingredientFood: IngredientFood}>;
  slidesEdit: Array<{image: string, title: string, ingredientFood: IngredientFood}>;

  newFoodForm: FormGroup;
  editFoodForm: FormGroup;
  newIngredientForm: FormGroup;

  newIngredient: Ingredient;

  currentPage: number;
  paginationLength: number;
  numberOfItems: number;

  loading: boolean;
  foodToEdit: Food;


  constructor(private foodService: FoodService, private ingredientsService:IngredientsService,
    private categoryService: CategoryService, private modalService: BsModalService,
    private formBuilder: FormBuilder,private spinnerService: NgxSpinnerService,
    private ifService: FoodIngredientService) {


  }

  async ngOnInit() {
    this.loading = true;
    this.spinnerService.show();
    this.createForms();
    this.slides = [];
    this.slidesEdit = [];
    this.newIngredient = null;
    this.foodToEdit = null;
    this.foods = await this.foodService.getFood();
    this.currentPage = 1;
    this.paginationLength = 2;
    this.numberOfItems = this.foods.length;
    this.foodsDisplayed = this.foods.slice(0, 2);
    this.ingredients = await this.ingredientsService.getIngredients();
    this.categories = await this.categoryService.getCategories();

    this.loading = false;
  }

  createForms(){
    this.newFoodForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9]{0,9}([.][0-9]{0,9})?$"), Validators.min(0)]],
      active: [false],
      isDishOfDay: [false],
      imageURL: [null, Validators.required],
      categoryId: [null, Validators.required]
    });

    this.editFoodForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern("^[0-9]{0,9}([.][0-9]{0,9})?$"), Validators.min(0)]],
      active: [false],
      isDishOfDay: [false],
      imageURL: [null, Validators.required],
      categoryId: [null, Validators.required]
    });

    this.newIngredientForm = this.formBuilder.group({
      ingredientId: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.pattern("^[0-9]{0,9}([.][0-9]{0,9})?$"), Validators.min(0)]],
      unit: [null, Validators.required]
    });

    this.newIngredientForm.controls['ingredientId'].valueChanges
    .subscribe((value) =>{
      this.newIngredient = this.ingredients.find((ing) => ing.IngredientID == value);
    });

  }

  async addFood(){

    const sendable: FoodAndIngredients = {
      food: {
        ...this.newFoodForm.value,
        categoryId: +this.newFoodForm.value.categoryId
      },
      ingredientFoods: []
    };

    for(let ingredient of this.slides){
      sendable.ingredientFoods.push(ingredient.ingredientFood);
    }


    try{
      const answer = await this.foodService.createFood(sendable);
      if(this.modalRef2){
        this.modalRef2.hide();
      }
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  async editFood(){

    const sendable: FoodAndIngredients = {
      food: {
        ...this.editFoodForm.value,
        categoryId: +this.editFoodForm.value.categoryId,
        foodId: this.foodToEdit.foodId
      },
      ingredientFoods: []
    };

    for(let ingredient of this.slidesEdit){
      sendable.ingredientFoods.push(ingredient.ingredientFood);
    }


    try{
      const answer = await this.foodService.updateFood(sendable);
      if(this.modalRef2){
        this.modalRef2.hide();
      }
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      console.log(e);
      alert(e.error.error_description);
    }
  }

  async onDelete(id:String){
    try{
      await this.foodService.deleteFood(id);
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg food-modal-container'
    });
  }

  async openModalEdit(template: TemplateRef<any>, id: number) {
    this.slidesEdit = [];
    this.foodToEdit = this.foodsDisplayed.find((food) => food.foodId === id);
    this.editFoodForm.setValue({
      name: this.foodToEdit.name,
      description: this.foodToEdit.description,
      price: this.foodToEdit.price,
      active: this.foodToEdit.active,
      isDishOfDay: this.foodToEdit.isDishOfDay,
      imageURL: this.foodToEdit.imageURL,
      categoryId: this.foodToEdit.categoryId
    });
    const relationships = await this.ifService.getIngredientFood(id);
    for(let ingF of relationships){
      const ing = this.ingredients.find((ing) => ing.IngredientID === ingF.ingredientId);
      this.slidesEdit.push({
        image: ing.imageURL,
        ingredientFood: ingF,
        title: ing.name + ': '+ingF.quantity+' '+ingF.unit
      });
    }
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg food-modal-container'
    });
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
      title: this.newIngredient.name +': '+this.newIngredientForm.value.quantity + ' '+this.newIngredientForm.value.unit,
      ingredientFood: {
        ...this.newIngredientForm.value,
        foodId: null,
        id: null,
        ingredientId: +this.newIngredientForm.value.ingredientId,
      }
    });
    this.newIngredientForm.reset();
    this.modalRef2.hide();
  }

  deleteNewIngredient(index: number){
    this.loadingCarousel = true;
    this.slides.splice(index, 1);
    setTimeout(() => {this.loadingCarousel = false}, 500);
  }

  editAddNewIngredient(){
    this.slidesEdit.push({
      image: this.newIngredient.imageURL,
      title: this.newIngredient.name +': '+this.newIngredientForm.value.quantity + ' '+this.newIngredientForm.value.unit,
      ingredientFood: {
        ...this.newIngredientForm.value,
        foodId: this.foodToEdit.foodId,
        id: null,
        ingredientId: +this.newIngredientForm.value.ingredientId,
      }
    });
    this.newIngredientForm.reset();
    this.modalRef2.hide();
  }

  editDeleteNewIngredient(index: number){
    this.loadingCarousel = true;
    this.slidesEdit.splice(index, 1);
    setTimeout(() => {this.loadingCarousel = false}, 500);
  }

  pageChanged(event){
    this.foodsDisplayed = this.foods.slice((event.page - 1) * event.itemsPerPage, ((event.page - 1) * event.itemsPerPage) + event.itemsPerPage);
  }

}
