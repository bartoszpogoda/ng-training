import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SharedModule } from './shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.module';
import { BookModule } from './book/book.module';

// xdescribe pomija testy
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BookModule, RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
