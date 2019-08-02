import { async, fakeAsync, tick, TestBed } from "@angular/core/testing";
import { BookService } from './book.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';

fdescribe('BookService', () => {
    let service: BookService;
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

        service = new BookService(httpClient);
    });

    it('finds a book', async(() => {
        const testBook: Book = {
            id: 0,
            author: 'Test author',
            title: 'Test title'
        };

        service.findOne(0).subscribe(book => {
            expect(book).toEqual(testBook);
        });

        const req = httpTestingController.expectOne('/api/books/0');
        expect(req.request.method).toEqual('GET');

        req.flush(testBook);

        httpTestingController.verify();
    }));

    // it('finds all books', async(() => {
    //     const testBooks: Book[] = [
    //         { id: 0, title: 'Test Book 1', author: 'Test author 1' },
    //         { id: 1, title: 'Test Book 2', author: 'Test author 2' },
    //         { id: 2, title: 'Test Book 3', author: 'Test author 3' },
    //     ];

    //     service.findAll().subscribe(books => expect(books).toEqual(testBooks));

    //     // const 

    // }));

    // it('returns two books initially', () => {
    //     // when
    //     service.findAll().subscribe(books => {
    //         // then
    //         expect(books).toBeDefined();
    //         expect(books.length).toBe(2);
    //     });
    // });

    // it('emits new saved book', async(() => {
    //     // given
    //     const newBook = { title: 'Pan Tadeusz', author: 'Adam Mickiewicz' };
    //     // when
    //     service.saveOrUpdate(newBook).subscribe((savedBook) => {
    //         // then
    //         expect(savedBook).toBeDefined();
    //         expect(savedBook.id).toBe(2);
    //         expect(savedBook.title).toBe('Pan Tadeusz');
    //         expect(savedBook.author).toBe('Adam Mickiewicz');
    //     });

    // }));

    // it('saves a new book', async(() => {
    //     // given
    //     const newBook = { title: 'Pan Tadeusz', author: 'Adam Mickiewicz' };
    //     // when
    //     service.saveOrUpdate(newBook).subscribe((savedBook) => {
    //         // then
    //         service.findAll().subscribe(books => {
    //             expect(books).toBeDefined();
    //             const foundSavedBook = books.find(book => book.id === 2);
    //             expect(foundSavedBook).toBeDefined();
    //             expect(foundSavedBook.author).toBe('Adam Mickiewicz');
    //             expect(foundSavedBook.title).toBe('Pan Tadeusz');
    //         });
    //     });

    // }));

    // it('emits updated book', async(() => {
    //     // given
    //     service.findOne(0).subscribe(book => {
    //         const updatedBook = {
    //             ...book,
    //             author: 'Mr. Update',
    //             title: 'Updating for beginners'
    //         };

    //         // when
    //         service.saveOrUpdate(updatedBook).subscribe((returnedUpdatedBook) => {
    //             // then
    //             expect(returnedUpdatedBook).toBeDefined();
    //             expect(returnedUpdatedBook.id).toBe(0);
    //             expect(returnedUpdatedBook.author).toBe('Mr. Update');
    //             expect(returnedUpdatedBook.title).toBe('Updating for beginners');
    //         });
    //     });
    // }));

    // it('updates an existing book', async(() => {
    //     // given
    //     service.findOne(0).subscribe(book => {
    //         const updatedBook = {
    //             ...book,
    //             author: 'Mr. Update',
    //             title: 'Updating for beginners'
    //         };

    //         // when
    //         service.saveOrUpdate(updatedBook).subscribe(() => {
    //             // then
    //             service.findOne(0).subscribe(foundUpdatedBook => {
    //                 expect(foundUpdatedBook).toBeDefined();
    //                 expect(foundUpdatedBook.id).toBe(0);
    //                 expect(foundUpdatedBook.author).toBe('Mr. Update');
    //                 expect(foundUpdatedBook.title).toBe('Updating for beginners');
    //             });
    //         });
    //     });
    // }));

}); 