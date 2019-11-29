import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Author } from 'src/app/interfaces/config-interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolveService implements Resolve<Author> {

  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Author> | Observable<never> {
    let userName = route.paramMap.get('userName');

    return userName ? this.userService.getProfile(userName).pipe(take(1)) : EMPTY;
  }
}
