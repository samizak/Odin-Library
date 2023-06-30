class Book {
  constructor(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// const library = new Library();
let library = [];

const nameEl = document.getElementById("name");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const isReadEl = document.getElementById("isRead");
const booksGrid = document.getElementById("booksGrid");

// Clear Form;
const $form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();

  nameEl.value = "";
  authorEl.value = "";
  pagesEl.value = "";
});

const bookGrid = document.getElementById("booksGrid").addEventListener("click", (e) => {
  const currentBookEl = e.target.parentNode;
  const currentBook = currentBookEl.children;

  // Remove book from the list, then delete it from DOM
  if (e.target.innerHTML == "Remove") {
    if (confirm(`are you sure you want to delete ${currentBook[0].innerText}`)) {
      library = library.filter((book) => {
        book.name === currentBook[0].innerText && book.author === currentBook[1].innerText && book.pages === currentBook[2].innerText.replace(" pages", "");
      });

      currentBookEl.remove();
    }
  }

  if (e.target.classList.contains("read-btn")) {
    const readBtn = currentBook[3];

    for (let book of library) {
      if (book.name === currentBook[0].innerText && book.author === currentBook[1].innerText && book.pages === currentBook[2].innerText.replace(" pages", "")) {
        if (book.isRead === "read") {
          readBtn.textContent = "Not read";
          readBtn.classList.remove("btn-green");
          readBtn.classList.add("btn-red");
          book.isRead = "not read";
        } else {
          readBtn.textContent = "Read";
          readBtn.classList.remove("btn-red");
          readBtn.classList.add("btn-green");
          book.isRead = "read";
        }

        return;
      }
    }
  }
});

function addBookToLibrary() {
  if (nameEl.value.length === 0 || authorEl.value.length === 0 || pagesEl.value.length === 0) {
    alert("Please, fill all the fields");
    return;
  }
  const newBook = new Book(nameEl.value, authorEl.value, pagesEl.value, isReadEl.value);

  library.push(newBook);
  UpdateBooksGrid();
}

function ChangeReadStatus(book) {
  if (library[book].status === "read") {
    library[book].status = "not read";
  } else library[book].status = "read";
}

const UpdateBooksGrid = () => {
  ResetBooksGrid();
  for (let book of library) CreateBookCard(book);
};

const ResetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const CreateBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  readBtn.classList.add("read-btn");
  removeBtn.classList.add("btn");

  title.textContent = book.name;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead === "read") {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  booksGrid.appendChild(bookCard);
};
