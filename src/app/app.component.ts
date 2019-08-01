import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <app-nav-bar></app-nav-bar>
      <!-- <app-book-overview class="pointer"></app-book-overview> -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
