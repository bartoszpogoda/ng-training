import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Observable, of, from, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// Pattern! Przekształcenie na BookFormModel a nastepnie patchValue - ustawienie formularza.
// interface BookFormModel {

// }

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book: Book | {};
  bookForm: FormGroup;

  // private bookId: number | null;

  constructor(private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    formBuilder: FormBuilder) {

    // this.bookId = this.route.snapshot.params.bookId ? +this.route.snapshot.params.bookId : null;
    this.book = this.route.snapshot.data.book || {};

    // this.bookForm = new FormGroup({
    //   // author: new FormControl(this.book && (this.book as Book).author),
    //   author: new FormControl(),
    //   title: new FormControl()
    // });

    this.bookForm = formBuilder.group({
      author: formBuilder.control('', [Validators.required, Validators.maxLength(15)]),
      title: formBuilder.control('', [Validators.required])
    });

    this.bookForm.patchValue(this.book);
  }

  getErrorsFor(controlName: string): string[] {
    const errorMessages = [];
    const errors = this.bookForm.get(controlName).errors;
    if(errors) {
      Object.keys(errors).forEach(errorCode => {
        if (errorCode === 'required') {
          errorMessages.push('Please provide a value');
        } else {
          errorMessages.push('Unknown error');
        }
      });
    }

    return errorMessages;
  }

  saveOrUpdateAndGoToOverview($event: Event) {
    if (this.bookForm.valid) {
      const author = this.bookForm.get('author').value;
      const title = this.bookForm.get('title').value;

      this.bookService.saveOrUpdate({
        ...this.book, author, title
      }).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
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
