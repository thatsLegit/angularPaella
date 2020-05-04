import { User } from './../../models/user';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  user: User;

  constructor(private usersService: UsersService) { 
  }

  ngOnInit() {
  }

  onSubmit() {
    // this.user = this.usersService.login(this.username, this.password);
    // if (this.user!=undefined){
    //   location.reload();
    //   alert(this.user.username + " connected successfuly");
    // } else {
    //   alert("wrong password or username.")
    // }
  }

}
