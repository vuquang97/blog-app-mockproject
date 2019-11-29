import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/config-interface';
import { onlyCharacter } from 'src/app/shared/directives/validators';

@Component({
  selector: 'app-handle-editor-form',
  templateUrl: './handle-editor-form.component.html',
  styleUrls: ['./handle-editor-form.component.css']
})
export class HandleEditorFormComponent implements OnInit {

  articleForm: FormGroup;
  tagList: string[] = [];
  slug: string;
  tagDisable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.articleForm = this.fb.group({
      title: ['', onlyCharacter],
      description: ['', onlyCharacter],
      body: ['', Validators.required],
      tagList: []
    });

    this.slug = this.route.snapshot.paramMap.get('slug');

    if (this.slug) {
      this.route.data.subscribe((vl: { article: Article }) => {
        this.articleForm.patchValue({
          title: vl.article.article.title,
          description: vl.article.article.description,
          body: vl.article.article.body,
          tagList: vl.article.article.tagList
        });

        this.tagList = vl.article.article.tagList;
      });

    }
  }

  handleEnter(e: Event) {
    let target = (e.target as HTMLInputElement);

    if (this.tagList.indexOf(target.value) === -1) {
      this.tagList.push(target.value);
      target.value = '';
    }
  }

  onSubmit() {

    this.articleForm.get('title').disable();
    this.articleForm.get('description').disable();
    this.articleForm.get('body').disable();
    this.articleForm.get('tagList').disable();
    this.tagDisable = true;

    this.articleForm.get('tagList').setValue(this.tagList);
    let article = {
      article: this.articleForm.value,
    }

    if (this.slug) {
      this.updateArticle(article);
    } else {
      this.articleService.addArticle(article).subscribe(vl => {
        this.router.navigate(['/article', vl.article.slug]);
        this.articleForm.reset();
      }, error => {
        this.articleForm.get('title').enable();
        this.articleForm.get('description').enable();
        this.articleForm.get('body').enable();
        this.articleForm.get('tagList').enable();
        this.tagDisable = false;
      });
    }
  }

  updateArticle(body: Article) {
    this.articleService.updateArticle(this.slug, body).subscribe(vl => {
      this.router.navigate(['/article', vl.article.slug]);
      this.articleForm.reset();
    });
  }

  deleteTag(index: number) {
    this.tagList.splice(index, 1);
  }

}
