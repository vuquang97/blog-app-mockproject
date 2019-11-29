import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/config-interface';
import { ActionService } from 'src/app/services/action/action.service';


@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;
  isFavorite: boolean = false;
  favoritesCount: number = 0;

  constructor(
    private actionService: ActionService
  ) { }

  ngOnInit() {
    this.isFavorite = this.article['favorited'];
    this.favoritesCount = this.article['favoritesCount'];
  }

  handleFavorite() {
    if(this.isFavorite) {
      this.actionService.unFavoriteArticle(this.article['slug']).subscribe(vl => {
        this.isFavorite = false;
        this.favoritesCount -= 1;
      });
    } else {
      this.actionService.favoriteArticle(this.article['slug']).subscribe(vl => {
        this.isFavorite = true;
        this.favoritesCount += 1;
      })
    }
    
  }

}
