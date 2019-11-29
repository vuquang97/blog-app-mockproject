import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOGIN } from 'src/app/constants/api.constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/config-interface';

interface LoginData {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(acc: LoginData): Observable<User> {
    return this.httpClient.post<User>(LOGIN.login, {
      user: acc
    });
  }
}
