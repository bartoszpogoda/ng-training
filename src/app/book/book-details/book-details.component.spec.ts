import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { Component } from '@angular/compiler/src/core';

// fdescribe force describe - wymusza, że tylko ten test się opdali
describe('BookDetailsComponent', () => {
  describe('(class)', () => {
    it('creates a component and exposes book', () => {
      // given
      const component = new BookDetailsComponent();
      // then
      expect(component.book).toBeDefined();
    })
  });

  describe('(DOM)', () => {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let element: HTMLElement;

    beforeEach(() => {
      return TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
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
      const titleElement = element.querySelector<HTMLDivElement>('div#title');
      // then
      expect(titleElement).toBeDefined();
      expect(titleElement.textContent).toBe('Clean Code');
    });
  });
});
