import { Category } from '../../../models/Category';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Array<Category>;
  categoriesDisplayed: Array<Category>;
  image: '../../../assets/img/noimage.jpg';
  modalRef: BsModalRef;

  newCategoryForm: FormGroup;
  editCategoryForm: FormGroup;

  newCategory: Category;

  currentPage: number;
  paginationLength: number;
  numberOfItems: number;

  loading: boolean;
  categoryToEdit: Category;

  constructor(private categoryService: CategoryService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,private spinnerService: NgxSpinnerService) {


  }

  async ngOnInit() {
    this.loading = true;
    this.spinnerService.show();
    this.createForms();
    this.newCategory = null;
    this.categoryToEdit = null;
    this.categories = await this.categoryService.getCategories();
    this.currentPage = 1;
    this.paginationLength = 10;
    this.numberOfItems = this.categories.length;
    this.categoriesDisplayed = this.categories.slice(0, 10);

    this.loading = false;
  }

  createForms(){
    this.newCategoryForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.editCategoryForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });

  }

  async addCategory(){

    const sendable: Category = {
      description: this.newCategoryForm.value.description,
      name: this.newCategoryForm.value.name
    };


    try{
      const answer = await this.categoryService.createCategory(sendable);
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  async editCategory(){

    const sendable: Category = {
      categoryId: this.categoryToEdit.categoryId,
      description: this.editCategoryForm.value.description,
      name: this.editCategoryForm.value.name
    };

    try{
      const answer = await this.categoryService.updateCategory(sendable);
      this.modalRef.hide();
      this.ngOnInit();
    } catch(e) {
      console.log(e);
      alert(e.error.error_description);
    }
  }

  async onDelete(id:String){
    try{
      await this.categoryService.deleteCategory(id);
      this.ngOnInit();
    } catch(e) {
      alert(e.error.error_description);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg Category-modal-container'
    });
  }

  async openModalEdit(template: TemplateRef<any>, id: number) {
    this.categoryToEdit = this.categoriesDisplayed.find((Category) => Category.categoryId === id);
    this.editCategoryForm.setValue({
      name: this.categoryToEdit.name,
      description: this.categoryToEdit.description
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg Category-modal-container'
    });
  }

  pageChanged(event){
    this.categoriesDisplayed = this.categories.slice((event.page - 1) * event.itemsPerPage, ((event.page - 1) * event.itemsPerPage) + event.itemsPerPage);
  }

}
