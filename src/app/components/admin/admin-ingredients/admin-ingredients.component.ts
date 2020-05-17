import { Ingredient } from './../../../models/ingredient';
import { IngredientsService } from './../../../services/ingredients.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.css']
})
export class AdminIngredientsComponent implements OnInit {

  ingredients: Array<Ingredient>;
  ingredientsDisplayed: Array<Ingredient>;
  image: '../../../assets/img/noimage.jpg';
  modalRef: BsModalRef;

  newIngredientForm: FormGroup;
  editIngredientForm: FormGroup;

  newIngredient: Ingredient;

  currentPage: number;
  paginationLength: number;
  numberOfItems: number;

  loading: boolean;
  ingredientToEdit: Ingredient;

  constructor(private ingredientsService:IngredientsService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,private spinnerService: NgxSpinnerService) {


  }

  async ngOnInit() {
    this.loading = true;
    this.spinnerService.show();
    this.createForms();
    this.newIngredient = null;
    this.ingredientToEdit = null;
    this.ingredients = await this.ingredientsService.getIngredients();
    this.currentPage = 1;
    this.paginationLength = 10;
    this.numberOfItems = this.ingredients.length;
    this.ingredientsDisplayed = this.ingredients.slice(0, 10);

    this.loading = false;
  }

  createForms(){
    this.newIngredientForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageURL: [null, Validators.required]
    });

    this.editIngredientForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageURL: [null, Validators.required]
    });

  }

  async addIngredient(){

    const sendable: Ingredient = {
      description: this.newIngredientForm.value.description,
      imageURL: this.newIngredientForm.value.imageURL,
      name: this.newIngredientForm.value.name
    };


    try{
      const answer = await this.ingredientsService.createIngredient(sendable);
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  async editIngredient(){

    const sendable: Ingredient = {
      IngredientID: this.ingredientToEdit.IngredientID,
      description: this.editIngredientForm.value.description,
      imageURL: this.editIngredientForm.value.imageURL,
      name: this.editIngredientForm.value.name
    };

    try{
      const answer = await this.ingredientsService.updateIngredient(sendable);
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      console.log(e);
      alert(e.error.error_description);
    }
  }

  async onDelete(id:String){
    try{
      await this.ingredientsService.deleteIngredient(id);
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg ingredient-modal-container'
    });
  }

  async openModalEdit(template: TemplateRef<any>, id: number) {
    this.ingredientToEdit = this.ingredientsDisplayed.find((ingredient) => ingredient.IngredientID === id);
    this.editIngredientForm.setValue({
      name: this.ingredientToEdit.name,
      imageURL: this.ingredientToEdit.imageURL,
      description: this.ingredientToEdit.description
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg ingredient-modal-container'
    });
  }

  pageChanged(event){
    this.ingredientsDisplayed = this.ingredients.slice((event.page - 1) * event.itemsPerPage, ((event.page - 1) * event.itemsPerPage) + event.itemsPerPage);
  }

}
