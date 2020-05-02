import { user } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  user: user;

  constructor() { }

  login(username: String, password: String): user{
    if (username=="admin" && password=="admin"){
      this.user = {
        id: 1,
        username: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        connected: true
      }
      return this.user;
    }
  }

}


  
