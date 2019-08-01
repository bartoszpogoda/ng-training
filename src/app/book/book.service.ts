import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, Subject, BehaviorSubject, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private idSeq = 0;

  private bookSubject = new BehaviorSubject<Book[]>([{
    id: this.idSeq++,
    title: 'Clean Code',
    author: 'Robert Cecil Martin'
  }, {
    id: this.idSeq++,
    title: 'Angular for nerds',
    author: 'Marek Matczak'
  }]);

  book$ = this.bookSubject.asObservable(); // <-- pattern. Wystawione jako pole a nie metoda

  findAll(): Observable<Book[]> {
    // Ten callback jest wywoływany od razu w momencie subskrybcji - synchronicznie
    return this.bookSubject;
  }

  saveOrUpdate(book: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.bookSubject.getValue();
      let updatedBooks;
      let bookAfterUpdate;
      if (book.id != null) {
        updatedBooks = currentBooks.map(currentBook => currentBook.id === book.id ? book : currentBook);
        bookAfterUpdate = book;
      } else {
        bookAfterUpdate = { ...book, id: this.idSeq++ };
        updatedBooks = [...currentBooks, bookAfterUpdate];
      }
      this.bookSubject.next(updatedBooks);

      subscriber.next(bookAfterUpdate);
      subscriber.complete();
    });
  }

  findOne(id: number): Observable<Book> {
    const currentBooks = this.bookSubject.getValue();
    const foundBook = currentBooks.find(book => book.id === id);

    return foundBook ? of(foundBook).pipe(delay(1000)) : throwError(`No book with id: ${id} found`);
  }

  // findAll(): Promise<Book[]> {
  //   return new Promise<Book[]>((resolve) => {
  //     setTimeout(() => resolve(this.books), 1000)
  //   });
  // }

}
