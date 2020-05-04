import { AdministrationComponent } from './components/admin/administration/administration.component';
import { FoodComponent } from './components/food/food.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DessertsComponent } from './components/desserts/desserts.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'food', component: FoodComponent },
  // { path: 'drinks', component: DrinksComponent },
  // { path: 'desserts', component: DessertsComponent },
  // { path: 'orders', component: OrdersComponent },
  { path: 'admin', component: AdministrationComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
