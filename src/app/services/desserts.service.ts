import { ingredient } from './../models/ingredient';
import { desserts } from './../models/desserts';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable()
export class DessertsService {
  d: desserts[] = [
    {
      id: uuid.v4(),
      name: 'Flan',
      image: '../assets/img/desserts/flan.jpg',
      price: 7,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'caramel',
          quantity: 1
        },
        {
          id: uuid.v4(),
          name: 'eggs',
          quantity: 2
        },
        {
          id: uuid.v4(),
          name: 'vanilla',
          quantity: 1
        },
        {
          id: uuid.v4(),
          name: 'milk',
          quantity: 1
        },
        {
          id: uuid.v4(),
          name: 'sugar',
          quantity: 1
        },
      ]
    },
    {
      id: uuid.v4(),
      name: 'Churros',
      image: '../assets/img/desserts/churros.jpg',
      price: 5,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'sugar',
          quantity: 2
        }
      ]
    }
  ];
  desserts$ = new BehaviorSubject(this.d);

  constructor() { }

  getDesserts():Observable<desserts[]>{
    return this.desserts$
  }

  addDessert(name:String, image:String, price:number, ingredients:ingredient[]){
    this.d.push({
      id: uuid.v4(),name,image,price, ingredients
    });
    this.desserts$.next(this.d);
  }

  onDelete(id:String){
    this.d = this.d.filter(dessert => dessert.id != id);
    this.desserts$.next(this.d);
  }

}
