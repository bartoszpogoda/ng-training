import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CommonModule, RouterModule, NavBarComponent, ReactiveFormsModule
  ]
})
export class SharedModule { }
