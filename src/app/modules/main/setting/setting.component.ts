import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/config-interface';
import { onlyCharacter, emailValidator } from 'src/app/shared/directives/validators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingForm: FormGroup;
  currentUser = {};
  updatePending: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.settingForm = this.fb.group({
      image: [''],
      userName: ['', onlyCharacter],
      bio: [''],
      email: ['', emailValidator],
      newPassword: ['']
    });

    this.userService.getCurrentUser().subscribe(vl => {
      this.currentUser = vl;
      this.settingForm.patchValue({
        image: vl.user.image,
        userName: vl.user.username,
        bio: vl.user.bio,
        email: vl.user.email,
      })
    });
  }

  updateAccount() {
    this.updatePending = true;
    let formValue = this.settingForm.value;

    this.settingForm.get('image').disable();
    this.settingForm.get('userName').disable();
    this.settingForm.get('bio').disable();
    this.settingForm.get('email').disable();
    this.settingForm.get('newPassword').disable();


    let body = {
      user: {
        image: formValue.image,
        username: formValue.userName,
        bio: formValue.bio,
        email: formValue.email,
      }
    };

    if (formValue.newPassword) {
      body.user['password'] = formValue.newPassword;
    }

    this.userService.updateUser(body).subscribe(vl => {
      this.userService.getCurrentUser().subscribe(dt => {
        this.router.navigate(['/profile', vl['user'].username]);
        this.updatePending = false
      });
    });

  }

  logout() {
    this.userService.deleteToken();
    this.userService.isLoggedIn();
    this.router.navigate(['/']);
  }

}
