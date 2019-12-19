import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ArticleService } from 'src/app/services/article/article.service';
import { Articles, Tag } from 'src/app/interfaces/config-interface';
import { LoginService } from 'src/app/services/login/login.service';
// import {} from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  listArticle: Articles;
  totalPage: number[] = [];
  isLogged = {};

  loadPending: boolean = false;
  pagiPending: boolean = false;

  tagSelected: string = '';

  switchPage: number = 0;

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.isLogged = this.userService.isLogged;

    this.loginService.isAutoLogin.subscribe(() => {
      this.switchPage = 1;
    });
    
    this.isLogged['logged'] ? this.getListArticle('feed', 10, 0) : this.getListArticle('global', 10, 0);
  }

  handleSelectPage(index) {
    
    let numStart = index * this.listArticle.articles.length;
    let type = '';
    // this.loadPending = true;
    this.pagiPending = true;

    if(this.switchPage === 0) {
     type = 'feed';
    } 

    if (this.switchPage === 1 || this.switchPage === 2) {
      type = 'global';
    }

    if(this.switchPage === 2) {
      this.getListArticle('global', 10, numStart, this.tagSelected);
      return;
    }

    this.getListArticle(type, 10, numStart);
  }

  getArticleByTag(event, limit: number = 10, numStart: number = 0) {
    let tag = event;
    this.tagSelected = tag;
    this.switchPage = 2;
    this.loadPending = true;
    this.totalPage = [];
    this.getListArticle('global', limit, numStart, tag);
  }

  getFeedArticle() {
    this.loadPending = true;
    this.totalPage = [];
    this.getListArticle('feed', 10, 0);
  }

  getGlobalArticle() {
    this.loadPending = true;
    this.totalPage = [];
    this.getListArticle('global', 10, 0);
  }

  getListArticle(type?: string, limit: number = 10, numStart: number = 0, tag?: string,) {

    this.articleService.getListArticle(type, tag, null, null, limit, numStart).subscribe(vl => {
      this.loadPending = false;
      this.pagiPending = false;
      this.listArticle = vl;

      if(type === 'feed') {
        this.switchPage = 0;
      }

      if(type === 'global' && !tag) {
        this.switchPage = 1;
      }

      if(type === 'global' && tag) {
        this.switchPage = 2;
      }
      
      if (vl.articlesCount >= 10) {
        this.totalPage = new Array(Math.ceil(vl.articlesCount / 10));
      } else {
        this.totalPage = [];
      }
      this.loadPending = false;
    })
  }

}
