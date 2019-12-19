import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN } from 'src/app/constants/api.constants';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/config-interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

interface LoginData {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  intervalAfterLogin;
  timer = 0.3;
  timerMiliseconds = this.timer * 60 * 1000;
  lastAction = Date.now();
  
  isAutoLogin = new Subject();
  // timeLeft = Date.now() + this.timer * 60 * 1000;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  setInterV() {
    this.intervalAfterLogin = setInterval(() => {
      let now = Date.now();
      let timeLeft = this.lastAction + this.timerMiliseconds;
      let diff = timeLeft - now;

      if (this.userService.isLogged.logged && diff < 0) {
        localStorage.removeItem('jwtToken');
        this.userService.isLoggedIn();
        clearInterval(this.intervalAfterLogin);
        this.isAutoLogin.next();
        this.router.navigate(['/']);
        return;
      }
     
      
    }, this.timerMiliseconds);
  }

  login(acc: LoginData): Observable<User> {
    return this.httpClient.post<User>(LOGIN.login, {
      user: acc
    }).pipe(
      tap(
        vl => { },
        err => { },
        () => {
         this.setInterV();    
        }
      )
    );
  }
}
