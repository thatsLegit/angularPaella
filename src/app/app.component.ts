import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { User, PrivilegeEnum } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Paella';
  isAdmin: boolean;

  constructor(private userService: UsersService){}

  ngOnInit(){
    this.isAdmin = this.userService.user ? this.userService.user.privilege === PrivilegeEnum.ADMIN : false;
    this.userService.user$.subscribe((user: User) => this.isAdmin = user ? user.privilege === PrivilegeEnum.ADMIN : false);
  }
}
