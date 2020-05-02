import { drinks } from './../models/drinks';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';

@Injectable()
export class DrinksService {
  drunk:drinks[] = [
    {
      id: uuid.v4(),
      name: 'Coca-cola',
      image: '../assets/img/drinks/CocaCola.jpg',
      price: 2
    },
    {
      id: uuid.v4(),
      name: 'Fanta',
      image: '../assets/img/drinks/Fanta.jpg',
      price: 2
    },
    {
      id: uuid.v4(),
      name: 'Sparkling water',
      image: '../../assets/img/drinks/SparklingWater.jpg',
      price: 2
    },
    {
      id: uuid.v4(),
      name: 'Evian',
      image: '../../assets/img/drinks/Evian.jpg',
      price: 1.50
    },
    {
      id: uuid.v4(),
      name: 'Red wine',
      image: '../../assets/img/drinks/RedWine.jpg',
      price: 25
    },
    {
      id: uuid.v4(),
      name: 'White wine',
      image: '../../assets/img/drinks/WhiteWine.jpg',
      price: 15
    }
  ];
  drinks$= new BehaviorSubject(this.drunk);

  constructor() { }

  getDrinks():Observable<drinks[]>{
    return this.drinks$;
  }

  addDrink(name:String, image:String, price:number){
    this.drunk.push({
      id: uuid.v4(),name,image, price
    });
    this.drinks$.next(this.drunk);
  }

  onDelete(id:String){
    this.drunk = this.drunk.filter(drink => drink.id != id);
    this.drinks$.next(this.drunk);
  }
}
