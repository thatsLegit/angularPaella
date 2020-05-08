import { UsersService } from 'src/app/services/users.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IngredientFood } from '../models/IngredientFood';
import { environment } from 'src/environments/environment';

@Injectable()
export class FoodIngredientService {

  constructor(private http: HttpClient, private userService: UsersService) { }

  getIngredientFood(foodId?: number, ingredientId?: number, id?: number): Promise<Array<IngredientFood>> {
    let url = environment.api + '/menu/ingredientFoods';
    let modified = false;
    if (foodId) {
      modified = true;
      url += '?foodId=' + encodeURIComponent(foodId);
    }
    if (ingredientId) {
      if (!modified) {
        modified = true;
        url += '?ingredientId=' + encodeURIComponent(ingredientId);
      } else {
        url += '&ingredientId=' + encodeURIComponent(ingredientId);
      }
    }
    if (id) {
      if (!modified) {
        url += '?id=' + encodeURIComponent(id);
      }
    }
    return this.http.get<Array<IngredientFood>>(url).toPromise();
  }

  createIngredientFood(foodId: number, ingredientId: number, unit: string, quantity?: number) {
    if (!this.userService.token) {
      return null;
    }
    let ingredientFood: IngredientFood = {
      id: null,
      foodId,
      ingredientId,
      quantity: quantity || 1,
      unit: unit || 'grams'
    };
    return this.http.post<IngredientFood>(environment.api + '/ingredientFoods?access_token=' + encodeURIComponent(this.userService.token), ingredientFood).toPromise();
  }

  updateIngredientFood(ingredientFood: IngredientFood): Promise<IngredientFood> {
    if (!this.userService.token) {
      return null;
    }
    return this.http.put<IngredientFood>(environment.api + '/ingredientFoods/' + ingredientFood.id + '?access_token=' + encodeURIComponent(this.userService.token), ingredientFood).toPromise();
  }

  deleteIngredientFoods(id: number): Promise<any> {
    if (!this.userService.token) {
      return null;
    }
    return this.http.delete(environment.api + '/ingredientFoods/' + id + '?access_token=' + encodeURIComponent(this.userService.token)).toPromise();
  }
}
