import { User, PrivilegeEnum } from './../models/user';
import { Injectable, EventEmitter } from '@angular/core';
import { TokenResponse } from '../models/TokenResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  user: User;
  token: string;

  user$: EventEmitter<User> = new EventEmitter();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');

    if(user){
      this.user = JSON.parse(user);
      this.token = localStorage.getItem('token');
      this.user$.next(this.user);
    }

  }

  async register(user: User): Promise<User>{
    const registration = await this.http.post<User>(environment.api+'/customers', user).toPromise();
    this.login(registration.email, registration.password);
    return registration;
  }
  
  update(user: User): Promise<User>{
    return this.http.put<User>(environment.api+(user.privilege === PrivilegeEnum.ADMIN ? '/admins' : '/customers') + '/'+user.id+'?access_token='+encodeURIComponent(this.token), user).toPromise();
  }
  
  async delete(userId: number){
    try {
      const response = await this.http.delete(environment.api+'/customers'+ '/'+userId+'?access_token='+encodeURIComponent(this.token)).toPromise();
      return response;
    } catch(e) {
      try { 
        const response = await this.http.delete(environment.api+'/admins'+ '/'+userId+'?access_token='+encodeURIComponent(this.token)).toPromise();
        return response;
      } catch(e2){
        throw e2;
      }
    }
  }

  async login(email: string, password: string): Promise<User>{
    try{
      const tokenResponse: TokenResponse = await this.http.post<TokenResponse>(
        environment.api+'/oauth/token?grant_type='+encodeURIComponent('password')+
        '&password='+encodeURIComponent(password)+
        '&username='+encodeURIComponent(email), 
        null, {
          headers: {
            'Authorization': 'Basic '+btoa(environment.username+':'+environment.password),
          }
        }).toPromise();
        this.token = tokenResponse.access_token;
    } catch(e){
      this.user = null;
      this.token = null;
      this.user$.next(null);
      localStorage.clear();
      return null;
    }

    try {
      this.user = (await this.http.get<User>(environment.api+'/customers?email='+encodeURIComponent(email)+'&access_token='+encodeURIComponent(this.token)).toPromise())[0];
      delete this.user.password;
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
      this.user$.next(this.user);
    } catch(e) {
      try { 
        this.user = (await this.http.get<User>(environment.api+'/admins?email='+encodeURIComponent(email)+'&access_token='+encodeURIComponent(this.token)).toPromise())[0];
        delete this.user.password;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        this.user$.next(this.user);
      } catch(e2){
        this.user$.next(null);
        this.user = null;
        this.token = null;
        localStorage.clear();
        return null;
      }
    }
  }

  logout(){
    this.user$.next(null);
    this.user = null;
    this.token = null;
    localStorage.clear();
  }

}


  
