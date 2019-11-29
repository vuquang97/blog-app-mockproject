import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from 'src/app/interfaces/config-interface';
import { ArticleService } from 'src/app/services/article/article.service';
import { Observable, observable, of, never, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorResolveService implements Resolve<Article> {

  constructor(
    private articleService: ArticleService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<Article> | Observable<never> {

    let slug = route.paramMap.get('slug');

    if(slug) {
      return this.articleService.getArticle(slug).pipe(take(1));
    }
    return EMPTY;
  }
}
