import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Book } from '../book';
import { Observable, throwError, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookService } from '../book.service';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class BookDetailsResolver implements Resolve<Book> {

    constructor(private readonly bookService: BookService,
                private readonly router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Book> {
        const bookId = +route.params.bookId;
        return this.bookService.findOne(bookId)
            .pipe(catchError(error => {
                this.router.navigate['/book'];
                return throwError(error);
            }));
    }

}