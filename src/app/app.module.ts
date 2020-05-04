import { IngredientsService } from './services/ingredients.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';
import { FoodService } from './services/food.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopLayerComponent } from './components/top-layer/top-layer.component';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/food/food.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DrinksItemComponent } from './components/drinks-item/drinks-item.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { DessertsItemComponent } from './components/desserts-item/desserts-item.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminFoodComponent } from './components/admin/admin-food/admin-food.component';
import { AdminIngredientsComponent } from './components/admin/admin-ingredients/admin-ingredients.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { AdminDrinksComponent } from './components/admin/admin-drinks/admin-drinks.component';
import { AdminDessertsComponent } from './components/admin/admin-desserts/admin-desserts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopLayerComponent,
    HomeComponent,
    FoodComponent,
    FoodItemComponent,
    DrinksComponent,
    DrinksItemComponent,
    DessertsComponent,
    DessertsItemComponent,
    LoginComponent,
    OrdersComponent,
    AdminFoodComponent,
    AdminIngredientsComponent,
    AdministrationComponent,
    AdminDrinksComponent,
    AdminDessertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [FoodService, UsersService, OrdersService, IngredientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
