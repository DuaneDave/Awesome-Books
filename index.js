const shelve = document.querySelector('#book-shelve');
const form = document.querySelector('form');
const btnAddBook = document.querySelector('#add-book');
const bookInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#author-name');

let bookShelve = [];

function createBook(book, author) {
  let newBook = {
    bookName: book,
    author: author,
  };
  bookShelve.push(newBook);

  let mybook = document.createElement('div');
  bookShelve.forEach((book, idx) => {
    mybook.innerHTML = `<div class="book">
      <h3>${book.bookName}</h3>
      <p>${book.author}</p>
      <button class="delete" class="delete">Delete</button>
      </div>`;

    const deleteBtn = mybook.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
      bookShelve.splice(idx, 1);
      mybook.remove();
      storeShelve();
      console.log(idx);
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

