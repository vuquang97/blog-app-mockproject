import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HandleEditorFormComponent } from './handle-editor-form/handle-editor-form.component';
import { EditorResolveService } from './editor-resolve.service';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HandleEditorFormComponent },
      {
        path: ':slug',
        component: HandleEditorFormComponent,
        resolve: {
          article: EditorResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
