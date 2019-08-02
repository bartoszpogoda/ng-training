import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { RouterModule, Router, ResolveEnd, ResolveStart } from '@angular/router';
import { BookOverviewComponent } from './book/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SharedModule } from './shared/shared.module';
import { BookDetailsResolver } from './book/book-details/book-details.resolver';
import { filter } from 'rxjs/operators';
import {HttpClientModule} from '@angular/common/http';

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
  },
  {
    path: 'books',
    component: BookOverviewComponent
  },
  {
    path: 'book',
    component: BookDetailsComponent
  },
  {
    path: 'book/:bookId',
    component: BookDetailsComponent,
    resolve: {
      book: BookDetailsResolver
    }
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BookModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
