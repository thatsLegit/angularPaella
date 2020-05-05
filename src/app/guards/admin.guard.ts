import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UsersService } from '../services/users.service';
import { PrivilegeEnum } from '../models/user';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.userService.user;
    if(user.privilege === PrivilegeEnum.ADMIN){
        return true;
    }
    return false;
  }
}
