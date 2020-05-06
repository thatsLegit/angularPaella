import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { UsersService } from './users.service';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient, private userService: UsersService) { }

  getCategories(description?: string, name?: string):Promise<Array<Category>>{
    let url = environment.api+'/menu/categories';
    let modified = false;

    if(description){
      modified = true;
      url += '?description='+encodeURIComponent(description);
    }
    
    if(name){
      if(!modified){
        modified = true;
        url += '?name='+encodeURIComponent(name);
      } else {
        url += '&name='+encodeURIComponent(name);
      }
    }

    return this.http.get<Array<Category>>(url).toPromise();
  }
  
  getCategoryById(id: number):Promise<Category>{
    return this.http.get<Category>(environment.api+'/menu/categories/'+id).toPromise();
  }

  createCategory(category: Category): Promise<Category>{
    category.categoryId = null;
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.post<Category>(environment.api+'/menu/categories?access_token='+encodeURIComponent(token), category).toPromise();
  }
  
  updateCategory(category: Category): Promise<Category>{
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.put<Category>(environment.api+'/menu/categories/'+category.categoryId+'?access_token='+encodeURIComponent(token), category).toPromise();
  }

  deletecategory(id:String): Promise<any>{
    const token = this.userService.token;
    if(!token){
      return null;
    }
    return this.http.delete(environment.api+'/menu/categories/'+id+'?access_token='+encodeURIComponent(token)).toPromise();
  }
}
