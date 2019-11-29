import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article, Comments, CommentItem, User } from 'src/app/interfaces/config-interface';
import { CommentService } from 'src/app/services/comment/comment.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleDetail: Article;
  listComments: CommentItem[] = [];
  isFavorite: boolean = false;
  favoritesCount: number = 0;
  isFollow: boolean = false;

  curenUserName: string = '';
  curenUser = {};

  commentValueGroup: FormGroup = new FormGroup({
    commentValue: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private userService: UserService,
    private router: Router,
    private actionService: ActionService
  ) { }

  ngOnInit() {

    if (this.userService.isLogged.logged) {
      this.userService.getCurrentUser().subscribe(user => {
        this.curenUserName = user.user.username;
        this.curenUser = user.user;
      })
    }

    this.route.data.subscribe((vl: { article: Article }) => {
      this.articleDetail = vl.article;
      this.isFavorite = vl.article.article.favorited;
      this.favoritesCount = vl.article.article.favoritesCount;
      this.isFollow = vl.article.article.author.following;

      this.commentService.getListComment(vl.article.article.slug).subscribe(comments => {
        this.listComments = comments.comments;
      });
    });

  }

  addComment() {
    let commentValue = this.commentValueGroup.get('commentValue');
    this.commentService.addComment(this.articleDetail.article.slug, commentValue.value).subscribe(data => {
      this.listComments.unshift(data.comment);
      commentValue.reset();
    });
  }

  deleteConment(id: number) {
    this.commentService.deleteComment(this.articleDetail.article.slug, id).subscribe(value => {
      let index = this.listComments.findIndex(el => el.id === id);
      this.listComments.splice(index, 1);
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.articleDetail.article.slug).subscribe(vl => {
      this.router.navigate(['/']);
    });
  }

  handleFavorite() {
    if (this.isFavorite) {
      this.actionService.unFavoriteArticle(this.articleDetail.article.slug).subscribe(vl => {
        this.isFavorite = false;
        this.favoritesCount -= 1;
      });
    } else {
      this.actionService.favoriteArticle(this.articleDetail.article.slug).subscribe(vl => {
        this.isFavorite = true;
        this.favoritesCount += 1;
      });
    }
  }

  handleFollow() {
    if(this.isFollow) {
      this.actionService.unFollowUser(this.articleDetail.article.author.username).subscribe(vl => {
        this.isFollow = false;
      });
    } else {
      this.actionService.followUser(this.articleDetail.article.author.username).subscribe(vl => {
        this.isFollow = true;
      });
    }
  }

}
