import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookSubject = new BehaviorSubject<Book[]>([{
      id: 0,
      title: 'Clean Code',
      author: 'Robert Cecil Martin'
    }, {
      id: 1,
      title: 'Angular for nerds',
      author: 'Marek Matczak'
  }]);

  book$ = this.bookSubject.asObservable(); // <-- pattern. Wystawione jako pole a nie metoda

  findAll(): Observable<Book[]> {
    // Ten callback jest wywoływany od razu w momencie subskrybcji - synchronicznie
    return this.bookSubject;
  }

  update(book: Book) {
    this.bookSubject.next(
      this.bookSubject.getValue().map(currentBook => currentBook.id === book.id ? book : currentBook)
    );
  }

  // findAll(): Promise<Book[]> {
  //   return new Promise<Book[]>((resolve) => {
  //     setTimeout(() => resolve(this.books), 1000)
  //   });
  // }

}
