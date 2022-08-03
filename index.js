class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const forLs = [];

/* eslint max-classes-per-file: ["error", 2] */

class DisplayBook {
  static addBook(newBook, index) {
    const library = document.querySelector('#book-shelve');
    if (!localStorage.getItem('books')) {
      const noBook = document.createElement('p');
      noBook.innerHTML = 'No books in library';
      library.appendChild(noBook);
    }
    const container = document.createElement('div');
    container.classList.add('book');
    container.classList.add('flex');
    container.innerHTML = `
    <div class="book-details">
     <h3>${newBook.title}</h3>
     <p>${newBook.author}</p>
    </div>
     <button class="delete" data-remove=${index}>Delete</button>
     `;
    library.appendChild(container);

    forLs.push(newBook);
  }

  // delete function
  static deleteBook(index) {
    forLs.splice(index, 1);
    DisplayBook.setLs();
  }

  // set local storage
  static setLs() {
    localStorage.setItem('books', JSON.stringify(forLs));
  }

  // fetch local storage
  static getLs() {
    if (localStorage.getItem('books')) {
      const books = JSON.parse(localStorage.getItem('books'));
      books.forEach((book, index) => {
        const newBook = new Book(book.title, book.author);
        DisplayBook.addBook(newBook, index);
      });
    } else {
      localStorage.setItem('books', JSON.stringify(forLs));
    }
    const deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.remove;
        DisplayBook.deleteBook(index);
        DisplayBook.setLs();
        e.target.parentElement.remove();
      });
    });
  }
}

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#author-name').value;

  if (title !== '' && author !== '') {
    const newBook = new Book(title, author);
    DisplayBook.addBook(newBook);

    DisplayBook.setLs(newBook);

    document.querySelector('#book-name').value = '';
    document.querySelector('#author-name').value = '';

    document.querySelector('#book-name').focus();
  }

  const deleteBtn = document.querySelectorAll('.delete');
  deleteBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.remove;
      DisplayBook.deleteBook(index);
      e.target.parentElement.remove();
    });
  });
});

// buttons
const listBtn = document.querySelector('#list');
const addBookBtn = document.querySelector('#add-book');
const contactBtn = document.querySelector('#contact');

// sections
const contact = document.querySelector('.contact');
const bookList = document.querySelector('.shelve');
const addNewBook = document.querySelector('.form');

listBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bookList.classList.remove('hide');
  contact.classList.add('hide');
  addNewBook.classList.add('hide');
});

addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addNewBook.classList.remove('hide');
  contact.classList.add('hide');
  bookList.classList.add('hide');
});

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  contact.classList.remove('hide');
  bookList.classList.add('hide');
  addNewBook.classList.add('hide');
});

const scrollToTop = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollToTop.classList.add('fade');
  } else {
    scrollToTop.classList.remove('fade');
  }
});





DisplayBook.getLs();
