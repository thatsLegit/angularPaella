import { Food } from './../models/food';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FoodAndIngredients } from '../models/FoodAndIngredients';
import { UsersService } from './users.service';

@Injectable()
export class FoodService {

  constructor(private http: HttpClient, private userService: UsersService) { }

  getFood(categoryId?: number, description?: string, name?: string, forceNormal?: boolean):Promise<Array<Food>>{
    let url = environment.api+'/menu/food';
    let modified = false;
    if(categoryId){
      modified = true;
      url += '?categoryId='+encodeURIComponent(categoryId);
    }

    if(description){
      if(!modified){
        modified = true;
        url += '?description='+encodeURIComponent(description);
      } else {
        url += '&description='+encodeURIComponent(description);
      }
    }
    
    if(name){
      if(!modified){
        modified = true;
        url += '?name='+encodeURIComponent(name);
      } else {
        url += '&name='+encodeURIComponent(name);
      }
    }

    const token = this.userService.token;


    if(token && !forceNormal){
      if(!modified){
        modified = true;
        url += '?access_token='+encodeURIComponent(token);
      } else {
        url += '&access_token='+encodeURIComponent(token);
      }
    }

    return this.http.get<Array<Food>>(url).toPromise();
  }

  getDishOfTheDay(): Promise<Array<Food>>{
    return this.http.get<Array<Food>>(environment.api+'/menu/dishOfDay').toPromise();
  }

  getQuantitySold(id: number){
    return this.http.get<number>(environment.api+'/menu/foodQuantity/'+id).toPromise();
  }
  
  getFoodById(id: number):Promise<Food>{
    return this.http.get<Food>(environment.api+'/menu/food/'+id).toPromise();
  }

  createFood(food: FoodAndIngredients): Promise<Food>{
    food.food.foodId = null;
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.post<Food>(environment.api+'/menu/food?access_token='+encodeURIComponent(token), food).toPromise();
  }
  
  updateFood(food: FoodAndIngredients): Promise<Food>{
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.put<Food>(environment.api+'/menu/food/'+food.food.foodId+'?access_token='+encodeURIComponent(token), food).toPromise();
  }

  deleteFood(id:String): Promise<any>{
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.delete(environment.api+'/menu/food/'+id+'?access_token='+encodeURIComponent(token)).toPromise();
  }
}
