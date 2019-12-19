import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalPage: [];
  @Output() onSelectedPage = new EventEmitter();

  pageSelected: number = 1;

  listPageDefault: number[] = [];
  numStart: number = 0;

  startPart: number = 6;
  endPart: number = 9;

  constructor() { }

  ngOnInit() {
    this.updatePagi();
  }

  updatePagi() {
    let numList = this.totalPage.length - this.numStart >= 10 ? 10 : this.totalPage.length - this.numStart;

    let num = this.numStart;
    this.listPageDefault = [];

    for (let i = 0; i < numList; i++) {
      num += 1;
      this.listPageDefault.push(num);
    }


  }

  selectedPage(index: number) {
    if (this.listPageDefault[index] - 6 >= 0 && this.listPageDefault[index] < 46) {
      this.numStart = this.listPageDefault[index] - 6;
    }
    this.pageSelected = this.listPageDefault[index];
    this.onSelectedPage.emit(this.listPageDefault[index] - 1);
    this.updatePagi();
    return;
  }

  first() {
    if (this.pageSelected != 1) {
      this.numStart = 0;
      this.pageSelected = 1;
      this.onSelectedPage.emit(0);
      this.updatePagi();
    }

    return;
  }

  end() {
    if (this.pageSelected != this.totalPage.length) {
      this.numStart = this.totalPage.length > 10 ? this.totalPage.length - 10 : 0;
      this.pageSelected = this.totalPage.length;
      this.onSelectedPage.emit(this.totalPage.length - 1);
      this.updatePagi();
    }
    return;
  }

  previous() {
    if (this.pageSelected != 1) {
      if (this.pageSelected < 6 || this.pageSelected > this.totalPage.length - 4) {
        let num = this.listPageDefault.indexOf(this.pageSelected) - 1;
        this.selectedPage(num);
        return;
      } else {
        this.selectedPage(4);
      }
    }
    return;
  }

  next() {
    if (this.pageSelected != this.totalPage.length) {
      if (this.pageSelected < 6 || this.pageSelected >= this.totalPage.length - 4) {
        let num = this.listPageDefault.indexOf(this.pageSelected) + 1;
        this.selectedPage(num);
        return;
      } else {
        this.selectedPage(6);
      }
    }
    return;
  }

}
