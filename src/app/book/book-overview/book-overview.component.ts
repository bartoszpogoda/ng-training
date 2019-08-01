import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books$: Observable<Book[]>;
  selectedBook: Book | undefined;

  constructor(private readonly bookService: BookService, 
              private readonly router: Router) { }

  ngOnInit() {
    this.books$ = this.bookService.findAll();  
  }

  goToBookDetails(book: Book) {
    this.router.navigate(['/book', book.id]);
  }

}
