import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolveService } from './profile-resolve.service';


const routes: Routes = [
  {
    path: ':userName',
    component: ProfileComponent,
    resolve: { profile: ProfileResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
