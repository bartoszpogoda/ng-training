import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  @Input()
  results: Book[];

  @Output()
  bookClick = new EventEmitter<Book>();

  constructor() { }

  notifyOnRowClick(book: Book) {
    this.bookClick.emit(book);
  }

}
