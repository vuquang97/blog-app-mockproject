import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LoginGuard } from 'src/app/auth/login-guard/login.guard';
import { EditorResolveService } from './editor/editor-resolve.service';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'login',
        canActivate: [LoginGuard],
        loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
      },
      {
        path: 'register',
        canActivate: [LoginGuard],
        loadChildren: () => import('./register/register.module').then(mod => mod.RegisterModule)
      },
      {
        path: 'setting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./setting/setting.module').then(mod => mod.SettingModule)
      },
      {
        path: 'profile',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule)
      },
      {
        path: 'editor',
        canActivate: [AuthGuard],
        loadChildren: () => import('./editor/editor.module').then(mod => mod.EditorModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(mod => mod.ArticleModule)
      },
      // {
      //   path: '',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
