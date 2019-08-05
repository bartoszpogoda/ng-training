import { Injectable } from '@angular/core';
import { Book, BookProperties, SearchCriteria } from './book';
import { Observable, Subject, BehaviorSubject, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor(private readonly http: HttpClient) { }

  search(searchCriteria: SearchCriteria): Observable<Book[]> {

    let params = new HttpParams();
    if (searchCriteria.author) {
      params = params.append('author', searchCriteria.author);
    }
    if (searchCriteria.title) {
      params = params.append('title', searchCriteria.title);
    }

    return this.http.get<Book[]>('/api/books', { params })
  }

  findAll(): Observable<Book[]> {
    // // Ten callback jest wywoływany od razu w momencie subskrybcji - synchronicznie
    // return this.bookSubject;

    return this.http.get<Book[]>('/api/books');
  }

  saveOrUpdate(book: Book | BookProperties): Observable<Book> {

    const id = (book as Book).id;

    if (id != null) {
      return this.http.put<Book>(`/api/books/${id}`, book);
    } else {
      return this.http.post<Book>(`/api/books/`, book);
    }

    // return new Observable<Book>(subscriber => {
    //   const currentBooks = this.bookSubject.getValue();
    //   let updatedBooks;
    //   let bookAfterUpdate;

    //   const id = (book as Book).id; // jak rzutowanie sie nie uda bedzie nullem albo undefem

    //   if (id != null) {
    //     updatedBooks = currentBooks.map(currentBook => currentBook.id === id ? book : currentBook);
    //     bookAfterUpdate = book;
    //   } else {
    //     bookAfterUpdate = { ...book, id: this.idSeq++ };
    //     updatedBooks = [...currentBooks, bookAfterUpdate];
    //   }
    //   this.bookSubject.next(updatedBooks);

    //   subscriber.next(bookAfterUpdate);
    //   subscriber.complete();
    // });
  }

  findOne(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`);
    // const currentBooks = this.bookSubject.getValue();
    // const foundBook = currentBooks.find(book => book.id === id);

    // return foundBook ? of(foundBook).pipe(delay(1000)) : throwError(`No book with id: ${id} found`);
  }

  // findAll(): Promise<Book[]> {
  //   return new Promise<Book[]>((resolve) => {
  //     setTimeout(() => resolve(this.books), 1000)
  //   });
  // }

}
