import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleEditorFormComponent } from './handle-editor-form.component';

describe('HandleEditorFormComponent', () => {
  let component: HandleEditorFormComponent;
  let fixture: ComponentFixture<HandleEditorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleEditorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
