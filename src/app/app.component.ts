import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { ActionService } from './services/action/action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showProgress: boolean = false;

  constructor(
    private userService: UserService,
    private actionService: ActionService
  ) {

    this.actionService.showProgress.subscribe((vl: boolean) => {
     this.showProgress = vl;
    });

    this.userService.isLoggedIn();
    if(this.userService.isLogged.logged) {
      this.userService.getCurrentUser().subscribe();
    }
  }
}
