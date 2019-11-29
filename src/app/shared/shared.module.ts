import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from './directives/directive.module';
import { PipeModule } from './pipes/pipe.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginationComponent,
    ArticleItemComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    DirectiveModule,
    RouterModule.forChild([])
  ],
  exports: [
    ReactiveFormsModule,
    PipeModule,
    DirectiveModule,
    PaginationComponent,
    ArticleItemComponent,
  ]
})
export class SharedModule {}
