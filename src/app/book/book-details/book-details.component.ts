import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  // @ViewChild('bookForm', {static: true})
  // formElement: ElementRef<HTMLFormElement>;

  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookUpdate($event: Event) {
    $event.preventDefault();

    const formElement = $event.target as HTMLFormElement;

    const authorElement = formElement.querySelector<HTMLInputElement>('input#author');
    const titleElement = formElement.querySelector<HTMLInputElement>('input#title');
    const author = (authorElement && authorElement.value) || '';
    const title = titleElement ? titleElement.value : '';

    this.bookChange.emit({ ...this.book, author, title })
  }

  // notifyOnBookUpdate(author: string, title: string) {
  //   // const authorElement = this.formElement.nativeElement.querySelector<HTMLInputElement>('#author');
  //   // const authorValue = authorElement.value;
  //   console.log(author);
  //   console.log(title);


  // }
}
