import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IngredientFood } from '../models/IngredientFood';
import { environment } from 'src/environments/environment';

@Injectable()
export class FoodIngredientService {

  constructor(private http: HttpClient) { }

  async getByFoodId(id: number){
    return this.http.get<Array<IngredientFood>>(environment.api+'/menu/ingredientFoods?foodId='+encodeURIComponent(id)).toPromise();
  }
  
}
