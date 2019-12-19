import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Author, Article } from 'src/app/interfaces/config-interface';
import { HttpClient } from '@angular/common/http';
import { ACTION } from 'src/app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  // progressNum: number = 0;
  showProgress = new Subject();

  progressNum = new Subject<number>();

  constructor(
    private httpClient: HttpClient
  ) { }



  followUser(userName: string): Observable<Author> {
    return this.httpClient.post<Author>(ACTION.followUser + `/${userName}/follow`, {});
  }

  unFollowUser(userName: string): Observable<Author> {
    return this.httpClient.delete<Author>(ACTION.followUser + `/${userName}/follow`);
  }

  favoriteArticle(slug: string): Observable<Article> {
    return this.httpClient.post<Article>(ACTION.favoriteArticle + `/${slug}/favorite`, {});
  }

  unFavoriteArticle(slug: string): Observable<Article> {
    return this.httpClient.delete<Article>(ACTION.favoriteArticle + `/${slug}/favorite`, {});
  }
}
