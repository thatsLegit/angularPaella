import { drinks } from './../../models/drinks';
import { DrinksService } from './../../services/drinks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class DrinksComponent implements OnInit {
  drinks: drinks[];

  constructor(private drinksService:DrinksService) {
    this.drinksService.getDrinks().subscribe(drinks => this.drinks=drinks);
   }

  ngOnInit() {
    this.drinksService.getDrinks().subscribe(drinks => this.drinks=drinks);
  }

}
