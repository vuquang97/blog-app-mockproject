import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author, User, Articles } from 'src/app/interfaces/config-interface';
import { UserService } from 'src/app/services/user/user.service';
import { ArticleService } from 'src/app/services/article/article.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Author;
  clo = 'ssssss'
  currentUser;

  isFavorite: boolean = false;

  loadPending:boolean = false;
  pagiPending: boolean = false;

  listArticle: Articles;
  totalPage = [];
  changeStyleArticle: string = ''

  switchPage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private actionService: ActionService
  ) { }

  ngOnInit() {

    this.currentUser = this.userService.currentUser.user;

    this.route.data.subscribe(vl => {
      this.profile = vl.profile.profile;
      this.getListArticle('author');
    });

    // this.switchPage ? this.getListArticle('author')
    //   : this.getListArticle('favorite');
  }

  getMyArticle() {
    this.loadPending = true;
    this.totalPage = [];
    this.changeStyleArticle = '';
    this.getListArticle('author');
  }

  getFavoriteArticle() {
    this.loadPending = true;
    this.totalPage = [];
    this.changeStyleArticle = 'unFavorite';
    this.getListArticle('favorite');
  }

  getListArticle(type?: string, limit: number = 5, offset: number = 0) {

    if (type === 'author') {
      this.switchPage = true;
      this.articleService.getListArticle('global', null, this.profile.username, null, limit, offset).subscribe(vl => {
        this.loadPending = false;
        this.pagiPending = false;
        this.totalPage = new Array(Math.ceil(vl.articlesCount / 5));
        this.listArticle = vl;
      });
    }

    if (type === 'favorite') {
      this.switchPage = false;
      this.articleService.getListArticle('global', null, null, this.profile.username, limit, offset).subscribe(vl => {
        this.loadPending = false;
        this.pagiPending = false;
        this.totalPage = new Array(Math.ceil(vl.articlesCount / 5));
        this.listArticle = vl;
      });
    }

  }

  // favoriteArticle() {
  //   this.switchPage = false;
  //   this.articleService.getListArticle('global', null, null, null, 5, 0).subscribe(vl => {
  //     this.totalPage = new Array(Math.ceil(vl.articlesCount / 5));
  //     this.listArticle = vl;
  //   });
  // }

  handleSelectPage(index: number) {

    this.pagiPending = true;
    let numStart = index * this.listArticle.articles.length;

    if (this.switchPage) {
      this.getListArticle('author', 5, numStart);
    } else {
      this.getListArticle('favorite', 5, numStart);
    }
  }

  followUser() {
    this.actionService.followUser(this.profile.username).subscribe(vl => {
      this.profile = vl['profile'];
    });
  }

  unFollowUser() {
    this.actionService.unFollowUser(this.profile.username).subscribe(vl => {
      this.profile = vl['profile'];
    });
  }

}
