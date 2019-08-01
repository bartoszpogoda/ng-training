import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookService } from './book.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  imports: [
    SharedModule
  ],
  exports: [
    BookDetailsComponent, BookOverviewComponent
  ]
})
export class BookModule { }
