import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { onlyCharacter, emailValidator } from 'src/app/shared/directives/validators';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', onlyCharacter],
      email: ['', emailValidator],
      password: ['', onlyCharacter]
    });
  }

  onSubmit() {

    let formValue = this.registerForm.value;

    let body = {
      user: {
        username: formValue.userName,
        email: formValue.email,
        password: formValue.password
      }
    }
    this.userService.registerUser(body).subscribe(vl => {
      this.router.navigate(['/login']);
    });
  }

}
