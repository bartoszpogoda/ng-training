import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books$: Observable<Book[]>;
  selectedBook: Book | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.books$ = this.bookService.findAll();  
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(book: Book) {
    this.bookService.update(book);
    // this.books = this.books.map(currentBook => currentBook.id === book.id ? book : currentBook); 
    // this.selectedBook = book;
  }
}
