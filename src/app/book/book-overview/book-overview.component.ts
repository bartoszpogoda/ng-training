import { Component, OnInit } from '@angular/core';
import { Book, SearchCriteria } from '../book';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {

  searchCriteria: SearchCriteria = {};
  books$: Observable<Book[]>;
  selectedBook: Book | undefined;

  constructor(private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {

    this.books$ = route.params
      .pipe(
        tap(params => this.searchCriteria = params),
        switchMap(params => this.bookService.search(params))
      );

  }

  ngOnInit() {
    // this.books$ = this.bookService.findAll();
  }

  goToBookDetails(book: Book) {
    this.router.navigate(['/book', book.id]);
  }

  refreshParams(criteria: SearchCriteria) {
    this.router.navigate([criteria], {relativeTo: this.route})
  }

}
