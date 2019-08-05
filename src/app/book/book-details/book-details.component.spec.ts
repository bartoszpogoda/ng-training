import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { Component } from '@angular/compiler/src/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BookProperties } from '../book';
import { BookService } from '../book.service';
import { Observable, of } from 'rxjs';

// fdescribe force describe - wymusza, że tylko ten test się opdali
describe('BookDetailsComponent', () => {
  // describe('(class)', () => {
  //   it('creates a component and exposes book', () => {
  //     // given
  //     const component = new BookDetailsComponent();
  //     // then
  //     expect(component.book).toBeDefined();
  //   })
  // });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let element: HTMLElement;
    let testBook: Book;

    let bookServiceMock: any;
    let routerMock: any;

    beforeEach(() => {
      testBook = {
        id: 0,
        title: 'Test Title',
        author: 'Test Author'
      };


      // bookServiceMock = {
      //   saveOrUpdate(book: Book | BookProperties): Observable<Book> {
      //     return of(book as Book);
      //   }
      // }

      
      // spyOn(bookServiceMock, 'saveOrUpdate');

      bookServiceMock = jasmine.createSpyObj({saveOrUpdate: of({})});
      routerMock = jasmine.createSpyObj('router', ['navigate']);

      return TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule],
        declarations: [BookDetailsComponent],
        providers: [{
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                book: testBook
              }
            }
          }
        }, {
          provide: BookService, useValue: bookServiceMock
        }, {
          provide: Router, useValue: routerMock
        }]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      element = fixture.nativeElement;
    });

    it('creates a component', () => {
      // then
      expect(fixture.componentInstance).toBeDefined();
    });

    it('renders title', () => {
      // when
      fixture.detectChanges();
      const titleElement = element.querySelector<HTMLInputElement>('input#title');
      // then
      expect(titleElement).toBeDefined();
      expect(titleElement.value).toBe(testBook.title);
    });


    it('updates an existing book and goes to overview upon button click', () => {
      // given
      fixture.detectChanges();
      const titleElement = element.querySelector<HTMLInputElement>('input#title');
      titleElement.value = 'Updated Title';
      titleElement.dispatchEvent(new Event('input'));
      // when
      const buttonElement = element.querySelector<HTMLButtonElement>('button');
      buttonElement.click();
      // then
      console.log(bookServiceMock);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/books']);
      expect(bookServiceMock.saveOrUpdate).toHaveBeenCalled();
    });
  });
});
