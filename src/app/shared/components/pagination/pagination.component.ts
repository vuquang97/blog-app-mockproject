import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalPage: [];
  @Output() onSelectedPage = new EventEmitter();

  pageSelected: number = 0;

  constructor() { }

  ngOnInit() {
  }

  selectedPage(index: number) {
    this.pageSelected = index;
    this.onSelectedPage.emit(index);
  }

}
