import { Ingredient } from './../models/ingredient';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable()
export class IngredientsService {

    constructor(private http: HttpClient, private userService: UsersService) { }

    getIngredients(description?: string, name?: string):Promise<Array<Ingredient>>{
        let url = environment.api+'/menu/ingredients';
        let modified = false;
    
        if(name){
          modified = true;
          url += '?name='+encodeURIComponent(name);
        }
        
        if(description){
          if(!modified){
            modified = true;
            url += '?description='+encodeURIComponent(description);
          } else {
            url += '&description='+encodeURIComponent(description);
          }
        }
    
        return this.http.get<Array<Ingredient>>(url).toPromise();
      }
      
      getIngredientById(id: number):Promise<Ingredient>{
        return this.http.get<Ingredient>(environment.api+'/menu/ingredients/'+id).toPromise();
      }
    
      createIngredient(ingredient: Ingredient): Promise<Ingredient>{
        ingredient.IngredientID = null;
        const token = this.userService.token;
        if(!token){
          return null;
        }
        return this.http.post<Ingredient>(environment.api+'/menu/ingredients?access_token='+encodeURIComponent(token), ingredient).toPromise();
      }
      
      updateIngredient(ingredient: Ingredient): Promise<Ingredient>{
        const token = this.userService.token;
        if(!token){
          return null;
        }
        return this.http.put<Ingredient>(environment.api+'/menu/ingredients/'+ingredient.IngredientID+'?access_token='+encodeURIComponent(token), ingredient).toPromise();
      }
    
      deleteIngredient(id:String): Promise<any>{
        const token = this.userService.token;
        if(!token){
          return null;
        }
        return this.http.delete(environment.api+'/menu/ingredients/'+id+'?access_token='+encodeURIComponent(token)).toPromise();
      }
  
}
