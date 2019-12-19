import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Output() onSelectedTag = new EventEmitter();

  listTag = [];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    // this.articleService.getListTag().subscribe(vl => {
    //   this.listTag = vl.tags;
    // });

    this.articleService.getListTag.subscribe(vl => {
      this.listTag = vl.tags;
    })
  }

  tagSelected(tag) {
    this.onSelectedTag.emit(tag);
  }

}
