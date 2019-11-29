import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ARTICLE, TAG } from 'src/app/constants/api.constants';
import { Articles, Article, Tag } from 'src/app/interfaces/config-interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getArticle(slug: string): Observable<Article> {
    return this.httpClient.get<Article>(ARTICLE.getArticle + '/' + slug);
  }

  // getFeedArticle(): Observable<Articles> {
  //   return this.httpClient.get<Articles>(ARTICLE.getFeedArticles);
  // }

  getListArticle(type?: string, tag?: string, author?: string, favorited?: string, limit?: number, offset?: number)
  : Observable<Articles> {

    let url = type == 'feed' ? ARTICLE.getFeedArticles : ARTICLE.getArticles;

    let params = new HttpParams().set('limit', '' + limit);

    if(tag) {
      params = params.set('tag', tag);
    }

    if(author) {
      params = params.set('author', author);
    }

    if(favorited) {
      params = params.set('favorited', favorited);
    }

    if(offset) {
      params = params.set('offset', '' + offset);
    }

    return this.httpClient.get<Articles>(url, { params });
  }

  getListTag(): Observable<Tag> {
    return this.httpClient.get<Tag>(TAG.getTags);
  }

  addArticle(article: Article):Observable<Article> {
    return this.httpClient.post<Article>(ARTICLE.createArticle, article);
  }

  deleteArticle(slug: string):Observable<Article> {
    return this.httpClient.delete<Article>(ARTICLE.deleteArticle + '/' + slug);
  }

  updateArticle(slug: string, body: Article): Observable<Article> {
    return this.httpClient.put<Article>(ARTICLE.updateArticle + '/' + slug, body);
  }
}
