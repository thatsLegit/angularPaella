import { IngredientsService } from './services/ingredients.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { FoodService } from './services/food.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner"; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { TopLayerComponent } from './components/common/top-layer/top-layer.component';
import { HomeComponent } from './components/common/home/home.component';
import { FoodComponent } from './components/common/food/food.component';
import { FoodItemComponent } from './components/common/food-item/food-item.component';
import { AdminFoodComponent } from './components/admin/admin-food/admin-food.component';
import { LoginComponent } from './components/common/login/login.component';
import { OrdersComponent } from './components/common/orders/orders.component';
import { AdminIngredientsComponent } from './components/admin/admin-ingredients/admin-ingredients.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { CommonComponent } from './components/common/common.component';
import { CategoryService } from './services/category.service';
import { AdminGuard } from './guards/admin.guard';
import { FoodIngredientService } from './services/food-ingredient.service';
import { PaypalBtnComponent } from './components/common/orders/paypal-btn/paypal-btn.component';
import { ThankYouComponent } from './components/common/thank-you/thank-you.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopLayerComponent,
    HomeComponent,
    FoodComponent,
    FoodItemComponent,
    LoginComponent,
    OrdersComponent,
    AdminFoodComponent,
    AdminIngredientsComponent,
    AdministrationComponent,
    AdminNavbarComponent,
    CommonComponent,
    ThankYouComponent,
    PaypalBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [FoodService, UsersService, OrdersService, IngredientsService, CategoryService, FoodIngredientService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
