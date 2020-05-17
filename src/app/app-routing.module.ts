import { FoodComponent } from './components/common/food/food.component';
import { HomeComponent } from './components/common/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/common/orders/orders.component';
import { AdminFoodComponent } from './components/admin/admin-food/admin-food.component';
import { AdminIngredientsComponent } from './components/admin/admin-ingredients/admin-ingredients.component';
import { AdminGuard } from './guards/admin.guard';
import { ThankYouComponent } from './components/common/thank-you/thank-you.component';
import { OrderHistoricComponent } from './components/common/order-historic/order-historic.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food', component: FoodComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-historic', component: OrderHistoricComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'admin', canActivate: [AdminGuard],
    children: [
      { path: 'foods', component: AdminFoodComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'ingredients', component: AdminIngredientsComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
