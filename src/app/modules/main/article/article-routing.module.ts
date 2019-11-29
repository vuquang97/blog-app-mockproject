import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleResolveService } from './article-resolve.service';


const routes: Routes = [
  {
    path: ':slug',
    component: ArticleDetailComponent,
    resolve: { article: ArticleResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
