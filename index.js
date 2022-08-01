const shelve = document.querySelector('#book-shelve');
const form = document.querySelector('form');
const btnDelete = document.querySelector('#delete');
const btnAddBook = document.querySelector('#add-book');
const bookInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#author-name');

let bookShelve = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (bookInput.value !== '' && authorInput.value !== '') {
    createBook(bookInput.value, authorInput.value);

    let newBook = document.createElement('div');
    bookShelve.forEach((book) => {
      newBook.innerHTML = `<div class="book">
      <h3>${book.bookName}</h3>
      <p>${book.author}</p>
      <button class="delete" id="delete">Delete</button>
      </div>`;
    });

    shelve.appendChild(newBook);

    bookInput.value = '';
    authorInput.value = '';
  }
});

function createBook(book, author) {
  let newBook = {
    bookName: book,
    author: author,
  };
  bookShelve.push(newBook);
}

//delete book
function deleteBook(book) {
  let index = bookShelve.indexOf(book);
  bookShelve.splice(index, 1);
  console.log(bookShelve);
}
