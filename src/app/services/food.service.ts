import { ingredient } from './../models/ingredient';
import { food } from './../models/food';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable()
export class FoodService {
  f: food[] = [
    {
      id: uuid.v4(),
      name: 'Spanish paëlla',
      image: '../../assets/img/food/SpanishPaella.jpg',
      price: 15,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'rice',
          quantity: 100
        },
        {
          id: uuid.v4(),
          name: 'lemon',
          quantity: 2
        },
        {
          id: uuid.v4(),
          name: 'mussels',
          quantity: 10
        },
        {
          id: uuid.v4(),
          name: 'shrimps',
          quantity: 5
        },
        {
          id: uuid.v4(),
          name: 'chicken',
          quantity: 100
        }
      ]
    },
    {
      id: uuid.v4(),
      name: 'Paëlla royale',
      image: '../../assets/img/food/PaellaRoyale.jpg',
      price: 20,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'rice',
          quantity: 200
        },
        {
          id: uuid.v4(),
          name: 'lemon',
          quantity: 3
        },
        {
          id: uuid.v4(),
          name: 'mussels',
          quantity: 12
        },
        {
          id: uuid.v4(),
          name: 'shrimps',
          quantity: 8
        }
      ]
    },
    {
      id: uuid.v4(),
      name: 'Lobsters',
      image: '../../../assets/img/food/Lobsters.jpg',
      price: 35,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'lobsters',
          quantity: 2
        }
      ]
    },
    {
      id: uuid.v4(),
      name: 'Mussels',
      image: '../../../assets/img/food/Mussels.jpg',
      price: 15,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'mussels',
          quantity: 5
        }
      ]
    },
    {
      id: uuid.v4(),
      name: 'Oysters',
      image: '../../../assets/img/food/Oysters.jpg',
      price: 25,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'oysters',
          quantity: 20
        }
      ]
    },
    {
      id: uuid.v4(),
      name: 'Vegetable paëlla',
      image: '../../../assets/img/food/VegetablePaella.jpg',
      price: 10,
      ingredients: [
        {
          id: uuid.v4(),
          name: 'rice',
          quantity: 200
        },
        {
          id: uuid.v4(),
          name: 'tomatoe',
          quantity: 2
        },
        {
          id: uuid.v4(),
          name: 'vegetables',
          quantity: 2
        },
        {
          id: uuid.v4(),
          name: 'onion',
          quantity: 1
        }
      ]
    }
  ];
  food$ = new BehaviorSubject(this.f);

  constructor() { }

  getFood():Observable<food[]>{
    return this.food$;
  }

  addFood(name:String,image:String,price:number,ingredients:ingredient[]){
    this.f.push({
      id: uuid.v4(),name,image,price,ingredients
    });
    this.food$.next(this.f);
  }

  onDelete(id:String){
    this.f = this.f.filter(food => food.id != id);
    this.food$.next(this.f);
  }
}
