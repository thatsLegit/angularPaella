import { DessertsService } from './../../services/desserts.service';
import { desserts } from './../../models/desserts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class DessertsComponent implements OnInit {
  desserts: desserts[];

  constructor(private dessertsService: DessertsService) { 
    this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
  }

  ngOnInit() {
    this.dessertsService.getDesserts().subscribe(dessert => this.desserts=dessert);
  }

}
