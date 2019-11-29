import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { onlyCharacter, emailValidator } from 'src/app/shared/directives/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  checkLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [emailValidator]],
      password: ['', [onlyCharacter]]
    });

    this.loginForm.get('email').valueChanges.subscribe(vl => {
      this.checkLogin = false;
    })

    this.loginForm.get('password').valueChanges.subscribe(vl => {
      this.checkLogin = false;
    })
  }

  onLogin() {
    let formValue = this.loginForm.value;

    if (this.loginForm.get('email') && this.loginForm.get('password')) {
      this.loginService.login(formValue).subscribe(value => {
        localStorage.setItem('jwtToken', value.user.token);
        this.userService.isLoggedIn();
        this.userService.getCurrentUser().subscribe();
        this.router.navigate(['/']);
      },
        err => this.checkLogin = true
      )
    }
  }

}
