import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './security/access-denied.component';


@NgModule({
  declarations: [NavBarComponent, AccessDeniedComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CommonModule, RouterModule, NavBarComponent, ReactiveFormsModule, AccessDeniedComponent
  ]
})
export class SharedModule { }
