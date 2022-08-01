const shelve = document.querySelector('#book-shelve');
const form = document.querySelector('form');
const bookInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#author-name');

const bookShelve = [];

function storeShelve() {
  localStorage.setItem('books', JSON.stringify(bookShelve));
}

function createBook(book, author) {
  const newBook = {
    bookName: book,
    author,
  };
  bookShelve.push(newBook);

  const mybook = document.createElement('div');
  bookShelve.forEach((book, idx) => {
    mybook.innerHTML = `<div class="book">
      <h3>${book.bookName}</h3>
      <p>${book.author}</p>
      <button class="delete" class="delete">Remove</button>
      </div>
      <hr>`;

    const deleteBtn = mybook.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
      bookShelve.splice(idx, 1);
      mybook.remove();
      storeShelve();
    });
  });

  storeShelve();

  shelve.appendChild(mybook);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookInput.value !== '' && authorInput.value !== '') {
    createBook(bookInput.value, authorInput.value);

    bookInput.value = '';
    authorInput.value = '';
  }
});

function retrieveShelve() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    books.forEach((book) => {
      createBook(book.bookName, book.author);
    });
  }
}
retrieveShelve();
