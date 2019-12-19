import { Directive, HostBinding, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Directive({
  selector: '[appAutoLogout]'
})
export class AutoLogoutDirective {

  intervalLogout;


  constructor(
    private loginService: LoginService
  ) {

    let jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      this.loginService.setInterV();
    }

  }

  resetTimer() {
    let jwt = localStorage.getItem('jwtToken');
    if (jwt) {
      this.loginService.lastAction = Date.now();
    }
  }

  @HostListener('click') onClick() {
    this.resetTimer();
  }

  @HostListener('mouseover') onMouseover() {
    this.resetTimer();
  }

  @HostListener('mouseout') onMouseout() {
    this.resetTimer();
  }

  @HostListener('keydown') onKeydown() {
    this.resetTimer();
  }

  @HostListener('keyup') onKeyup() {
    this.resetTimer();
  }

  @HostListener('keypress') onKeypress() {
    this.resetTimer();
  }

}
