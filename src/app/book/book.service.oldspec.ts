import { async, fakeAsync, tick } from "@angular/core/testing";
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    // given
    service = new BookService();
  });

  it('returns two books initially', () => {
    // when
    service.findAll().subscribe(books => {
      // then
      expect(books).toBeDefined();
      expect(books.length).toBe(2);
    });
  });

  it('emits new saved book', async(() => {
    // given
    const newBook = { title: 'Pan Tadeusz', author: 'Adam Mickiewicz' };
    // when
    service.saveOrUpdate(newBook).subscribe((savedBook) => {
      // then
      expect(savedBook).toBeDefined();
      expect(savedBook.id).toBe(2);
      expect(savedBook.title).toBe('Pan Tadeusz');
      expect(savedBook.author).toBe('Adam Mickiewicz');
    });

  }));

  it('saves a new book', async(() => {
    // given
    const newBook = { title: 'Pan Tadeusz', author: 'Adam Mickiewicz' };
    // when
    service.saveOrUpdate(newBook).subscribe((savedBook) => {
      // then
      service.findAll().subscribe(books => {
        expect(books).toBeDefined();
        const foundSavedBook = books.find(book => book.id === 2);
        expect(foundSavedBook).toBeDefined();
        expect(foundSavedBook.author).toBe('Adam Mickiewicz');
        expect(foundSavedBook.title).toBe('Pan Tadeusz');
      });
    });

  }));

  it('emits updated book', async(() => {
    // given
    service.findOne(0).subscribe(book => {
      const updatedBook = {
        ...book,
        author: 'Mr. Update',
        title: 'Updating for beginners'
      };

      // when
      service.saveOrUpdate(updatedBook).subscribe((returnedUpdatedBook) => {
        // then
        expect(returnedUpdatedBook).toBeDefined();
        expect(returnedUpdatedBook.id).toBe(0);
        expect(returnedUpdatedBook.author).toBe('Mr. Update');
        expect(returnedUpdatedBook.title).toBe('Updating for beginners');
      });
    });
  }));

  it('updates an existing book', async(() => {
    // given
    service.findOne(0).subscribe(book => {
      const updatedBook = {
        ...book,
        author: 'Mr. Update',
        title: 'Updating for beginners'
      };

      // when
      service.saveOrUpdate(updatedBook).subscribe(() => {
        // then
        service.findOne(0).subscribe(foundUpdatedBook => {
          expect(foundUpdatedBook).toBeDefined();
          expect(foundUpdatedBook.id).toBe(0);
          expect(foundUpdatedBook.author).toBe('Mr. Update');
          expect(foundUpdatedBook.title).toBe('Updating for beginners');
        });
      });
    });
  }));


  it('finds a book', async(() => {
    // when
    service.findOne(0).subscribe(book => {
      // then
      expect(book).toBeDefined();
      expect(book.author).toBe('Robert Cecil Martin');
      expect(book.title).toBe('Clean Code');
    });
  }));
});


// it('async', fakeAsync(() => {
//   setTimeout(() => {
//     expect(true).toBe(true);
//   }, 6000);

//   tick(6000); // symuluje czekanie 6 sekund w fakeAsync zonie
// }));

// it('async', async(() => {
//   setTimeout(() => {
//     expect(true).toBe(true);
//   }, 1000);
// }));

// Done callback

// it('async', (done) => {
//   setTimeout(() => {
//     expect(true).toBe(true);
//     done();
//   }, 1000);
// });