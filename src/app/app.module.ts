import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BookModule,
    RouterModule.forRoot([
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
    }])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
