import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  width: number = 0;
  fullSet: number = 100;

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.actionService.progressNum.subscribe({
      next: (x) => {

        if (x == 0) {

          this.fullSet = 100;

          var interval = setInterval(() => {
            if (this.width >= 90) {
              clearInterval(interval); 
              return;
            }
            this.fullSet = this.fullSet / 2;
            this.width += this.fullSet;
          }, 300);
          
        }

        if (x == 100) {
          this.width = 100;
          setTimeout(() => {
            this.actionService.showProgress.next(false);
            this.width = 0;
          }, 500);
        }
        return;
      }
  });
  }

}
