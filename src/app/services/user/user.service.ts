import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER } from 'src/app/constants/api.constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, Author } from 'src/app/interfaces/config-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged = {
    logged: false
  };


  currentUser = {
    user: {}
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(USER.getCurrentUser).pipe(
      tap(vl => {
        this.currentUser.user = vl;
      })
    );
  }

  isLoggedIn() {
    let userToken = localStorage.getItem('jwtToken');
    this.isLogged.logged = userToken ?  true : false;
    return this.isLogged.logged;
  }

  deleteToken() {
    localStorage.removeItem('jwtToken');
  }

  getProfile(userName: string): Observable<Author> {
    return this.httpClient.get<Author>(USER.getProfile + '/' + userName);
  }

  updateUser(body): Observable<Author> {
    return this.httpClient.put<Author>(USER.updateUser, body);
  }

  registerUser(body: { user: { } }): Observable<any> {
    return this.httpClient.post<any>(USER.registerUser, body);
  }
}
