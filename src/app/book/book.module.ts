import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { BookService } from './book.service';
import { SharedModule } from '../shared/shared.module';
import { SearchCriteriaComponent } from './book-overview/search-criteria/search-criteria.component';
import { SearchResultsComponent } from './book-overview/search-results/search-results.component';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent, SearchCriteriaComponent, SearchResultsComponent],
  imports: [
    SharedModule
  ],
  exports: [
    BookDetailsComponent, BookOverviewComponent
  ]
})
export class BookModule { }
