import { BehaviorSubject, Observable } from 'rxjs';
import { ingredient } from './../models/ingredient';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable()
export class IngredientsService {
  ingredients: ingredient[] = [
    {
      id: uuid.v4(),
      name: 'rice',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'lemon',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'mussels',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'shrimps',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'chicken',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'lobster',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'oysters',
      quantity: 10000
    },
    {
      id: uuid.v4(),
      name: 'caramel',
      quantity: 1000
    },
    {
      id: uuid.v4(),
      name: 'eggs',
      quantity: 200
    },
    {
      id: uuid.v4(),
      name: 'vanilla',
      quantity: 1000
    },
    {
      id: uuid.v4(),
      name: 'milk',
      quantity: 1000
    },
    {
      id: uuid.v4(),
      name: 'sugar',
      quantity: 0
    },
    {
      id: uuid.v4(),
      name: 'tomatoe',
      quantity: 200
    },
    {
      id: uuid.v4(),
      name: 'vegetables',
      quantity: 200
    },
    {
      id: uuid.v4(),
      name: 'onion',
      quantity: 0
    }
  ];
  ingredients$ = new BehaviorSubject(this.ingredients);

  constructor() { }

  getIngredients():Observable<ingredient[]>{
    return this.ingredients$;
  }

  addIngredient(name:String, quantity:number){
    this.ingredients.push({
      id: uuid.v4(), name, quantity
    })
  }

  onDelete(id: String){
    this.ingredients = this.ingredients.filter(ingredient => ingredient.id != id);
    this.ingredients$.next(this.ingredients);
  }

  onUpdate(id:String, sign:String){
    this.ingredients.forEach(ingredient => {
      if(ingredient.id == id){ 
        if(sign=="minus"){
          if(ingredient.quantity>1){
            ingredient.quantity--;
          }
        } else {
          ingredient.quantity++;
        }
      }
    });
    this.ingredients$.next(this.ingredients);
  }
}
