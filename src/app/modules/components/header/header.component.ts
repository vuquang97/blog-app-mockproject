import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = {
    logged: false
  };

  currentUser = {
    user: {}
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.isLogged = this.userService.isLogged;
  }

}
