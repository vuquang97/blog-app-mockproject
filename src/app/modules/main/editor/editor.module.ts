import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { HandleEditorFormComponent } from './handle-editor-form/handle-editor-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [HandleEditorFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
