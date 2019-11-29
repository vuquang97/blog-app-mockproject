import { TestBed } from '@angular/core/testing';

import { ArticleResolveService } from './article-resolve.service';

describe('ArticleResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleResolveService = TestBed.get(ArticleResolveService);
    expect(service).toBeTruthy();
  });
});
