import { TestBed } from '@angular/core/testing';

import { EditorResolveService } from './editor-resolve.service';

describe('EditorResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorResolveService = TestBed.get(EditorResolveService);
    expect(service).toBeTruthy();
  });
});
