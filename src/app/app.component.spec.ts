import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';

// xdescribe pomija testy
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BookDetailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
