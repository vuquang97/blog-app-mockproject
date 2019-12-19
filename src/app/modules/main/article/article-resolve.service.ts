import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from 'src/app/interfaces/config-interface';
import { Observable, EMPTY } from 'rxjs';
import { ArticleService } from 'src/app/services/article/article.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolveService implements Resolve<Article> {

  constructor(
    private articleService: ArticleService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Article> | Observable<never> {

    let slug = route.paramMap.get('slug');

    return slug ? this.articleService.getArticle(slug) : undefined;
  }
}
