import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-layer',
  templateUrl: './top-layer.component.html',
  styleUrls: ['./top-layer.component.css']
})
export class TopLayerComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.user ? true : false;
    this.userService.user$.subscribe((user) => {
      this.isLoggedIn = user ? true : false
    });
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }

}
