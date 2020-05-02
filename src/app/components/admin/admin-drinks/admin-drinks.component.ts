import { DrinksService } from './../../../services/drinks.service';
import { drinks } from './../../../models/drinks';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-drinks',
  templateUrl: './admin-drinks.component.html',
  styleUrls: ['./admin-drinks.component.css', '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AdminDrinksComponent implements OnInit {
  drinks: drinks[];
  name: String;
  price: number;
  image: "../../../assets/img/noimage.jpg";

  constructor(private drinksService:DrinksService) { 
    this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);
  }

  ngOnInit() {
    this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);
  }

  addDrink(){
    this.drinksService.addDrink(this.name, this.image, this.price);
  }

  onDelete(id:String){
    this.drinksService.onDelete(id);
  }

}
