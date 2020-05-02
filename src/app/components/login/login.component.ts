import { user } from './../../models/user';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  user: user;

  constructor(private usersService: UsersService) { 
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = this.usersService.login(this.username, this.password);
    if (this.user!=undefined){
      location.reload();
      alert(this.user.username + " connected successfuly");
    } else {
      alert("wrong password or username.")
    }
  }

}
