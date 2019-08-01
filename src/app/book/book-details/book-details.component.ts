import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable, of, from,  throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book | {}>;
  private bookId: number | null;

  constructor(private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {

    this.bookId = this.route.snapshot.params.bookId ? +this.route.snapshot.params.bookId : null;

  }

  ngOnInit(): void {
    this.book$ = this.bookId != null ? this.bookService.findOne(this.bookId)
      .pipe(
        catchError((err) => {
          return from(this.router.navigate(['/book']));
          // return throwError(err);
      })): of({})
  }

  saveOrUpdateAndGoToOverview($event: Event) {
    $event.preventDefault();

    const formElement = $event.target as HTMLFormElement;

    const authorElement = formElement.querySelector<HTMLInputElement>('input#author');
    const titleElement = formElement.querySelector<HTMLInputElement>('input#title');
    const author = (authorElement && authorElement.value) || '';
    const title = titleElement ? titleElement.value : '';

    this.bookService.saveOrUpdate({
      id: this.bookId, author, title
    }).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/books']);
    });
  }

  // @ViewChild('bookForm', {static: true})
  // formElement: ElementRef<HTMLFormElement>;

  // @Input()
  // book: Book;

  // @Output()
  // bookChange = new EventEmitter<Book>();

  // notifyOnBookUpdate($event: Event) {
  //   $event.preventDefault();

  //   const formElement = $event.target as HTMLFormElement;

  //   const authorElement = formElement.querySelector<HTMLInputElement>('input#author');
  //   const titleElement = formElement.querySelector<HTMLInputElement>('input#title');
  //   const author = (authorElement && authorElement.value) || '';
  //   const title = titleElement ? titleElement.value : '';

  //   this.bookChange.emit({ ...this.book, author, title })
  // }

  // notifyOnBookUpdate(author: string, title: string) {
  //   // const authorElement = this.formElement.nativeElement.querySelector<HTMLInputElement>('#author');
  //   // const authorValue = authorElement.value;
  //   console.log(author);
  //   console.log(title);


  // }
}
