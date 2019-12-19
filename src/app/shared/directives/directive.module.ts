import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoLogoutDirective } from './auto-logout/auto-logout.directive';

const DERECTIVE = [
  AutoLogoutDirective
]


@NgModule({
  declarations: [
    ...DERECTIVE
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...DERECTIVE
  ]
})
export class DirectiveModule { }
