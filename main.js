let bookForm = document.getElementById("bookForm");

let bookTitle = document.getElementById("bookFormTitle");
let bookAuthor = document.getElementById("bookFormAuthor");
let bookYear = document.getElementById("bookFormYear");
let bookIsComplete = document.getElementById("bookFormIsComplete");

let bookSubmit = document.getElementById("bookFormSubmit");
let incompleteBookList = document.getElementById("incompleteBookList");
let completeBookList = document.getElementById("completeBookList");
const searchForm = document.getElementById("searchBook");
const searchInput = document.getElementById("searchBookTitle");
const searchSubmit = document.getElementById("searchSubmit");

const deleteButton = document.querySelector(
  '[data-testid="bookItemDeleteButton"]'
);
let books = [];

const storedBooks = localStorage.getItem("books");
if (storedBooks !== null) {
  books = JSON.parse(storedBooks);
}

bookSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const newBook = {
    id: Date.now(),
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
    isComplete: bookIsComplete.checked,
  };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  alert("Buku baru ditambahkan");
  console.log(books);
  renderIncompleteBookList();
  renderCompleteBook();

  // Clear the form fields
  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
  bookIsComplete.checked = false;

  // Render the incomplete book list
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value.toLowerCase();
  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery);
  });
  renderSearchResults(filteredBooks);
});
function renderSearchResults(books) {
  const searchResults = document.getElementById("searchResults");
  if (!searchResults) {
    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.id = "searchResults";
    document.body.appendChild(searchResultsContainer);
  } else {
    searchResults.innerHTML = "";
  }
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.setAttribute("data-testid","bookItemTitle")
    bookItem.setAttribute("data-testid", "bookItem");

    const bookItemTitle = document.createElement("h3");
    bookItemTitle.setAttribute("data-testid", "bookItemTitle");
    bookItemTitle.textContent = book.title;
    bookItem.appendChild(bookItemTitle);

    const bookItemAuthor = document.createElement("p");
    bookItemAuthor.setAttribute("data-testid", "bookItemAuthor");
    bookItemAuthor.textContent = `Penulis: ${book.author}`;
    bookItem.appendChild(bookItemAuthor);

    const bookItemYear = document.createElement("p");
    bookItemYear.setAttribute("data-testid", "bookItemYear");
    bookItemYear.textContent = `Tahun: ${book.year}`;
    bookItem.appendChild(bookItemYear);

    const buttonContainer = document.createElement("div");

    const bookItemIsCompleteButton = document.createElement("button");
    bookItemIsCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    bookItemIsCompleteButton.textContent = book.isComplete
      ? "Ubah kondisi"
      : "Selesai Dibaca";
    buttonContainer.appendChild(bookItemIsCompleteButton);

    const bookItemDeleteButton = document.createElement("button");
    bookItemDeleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    bookItemDeleteButton.textContent = "Hapus";
    buttonContainer.appendChild(bookItemDeleteButton);

    const bookItemEditButton = document.createElement("button");
    bookItemEditButton.setAttribute("data-testid", "bookItemEditButton");
    bookItemEditButton.textContent = "Edit";
    buttonContainer.appendChild(bookItemEditButton);

    bookItemDeleteButton.addEventListener("click", () => {
      const bookId = bookItem.dataset.bookid;
      const index = books.findIndex((b) => b.id === parseInt(bookId));
      books.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(books));
      renderSearchResults(books);
      renderIncompleteBookList();
      renderCompleteBook();
    });

    bookItemIsCompleteButton.addEventListener("click", () => {
      const bookId = bookItem.dataset.bookid;
      const index = books.findIndex((b) => b.id === parseInt(bookId));
      books[index].isComplete = !books[index].isComplete;
      localStorage.setItem("books", JSON.stringify(books));
      renderSearchResults(books);
      renderIncompleteBookList();
      renderCompleteBook();
    });

    bookItem.appendChild(buttonContainer);
    document.getElementById("searchResults").appendChild(bookItem);
  });
}
function renderIncompleteBookList() {
  incompleteBookList.innerHTML = "";
  books.forEach((book) => {
    if (!book.isComplete) {
      const bookItem = document.createElement("div");
      bookItem.setAttribute("data-testid","bookItemTitle")
      bookItem.setAttribute("data-testid", "bookItem");

      const bookItemTitle = document.createElement("h3");
      bookItemTitle.setAttribute("data-testid", "bookItemTitle");
      bookItemTitle.textContent = book.title;
      bookItem.appendChild(bookItemTitle);

      const bookItemAuthor = document.createElement("p");
      bookItemAuthor.setAttribute("data-testid", "bookItemAuthor");
      bookItemAuthor.textContent = `Penulis: ${book.author}`;
      bookItem.appendChild(bookItemAuthor);

      const bookItemYear = document.createElement("p");
      bookItemYear.setAttribute("data-testid", "bookItemYear");
      bookItemYear.textContent = `Tahun: ${book.year}`;
      bookItem.appendChild(bookItemYear);

      const buttonContainer = document.createElement("div");

      const bookItemIsCompleteButton = document.createElement("button");
      bookItemIsCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");
      bookItemIsCompleteButton.textContent = "Selesai Dibaca";
      buttonContainer.appendChild(bookItemIsCompleteButton);

      const bookItemDeleteButton = document.createElement("button");
      bookItemDeleteButton.setAttribute("data-testid", "bookItemDeleteButton");	
      bookItemDeleteButton.textContent = "Hapus";
      buttonContainer.appendChild(bookItemDeleteButton);

      bookItemDeleteButton.addEventListener("click", () => {
        book = books.filter((b) => b.id !== book.id);
        localStorage.setItem("books", JSON.stringify(book));
        alert("Buku di hapus");
        location.reload();
        renderIncompleteBookList();
        renderCompleteBook();
      });

      bookItemIsCompleteButton.addEventListener("click", () => {
        book.isComplete = !book.isComplete;
        localStorage.setItem("books", JSON.stringify(books));
        renderIncompleteBookList();
      });

      const bookItemEditButton = document.createElement("button");
      bookItemEditButton.setAttribute("data-testid","bookItemEditButton");
      bookItemEditButton.textContent = "Edit";
      buttonContainer.appendChild(bookItemEditButton);

      bookItem.appendChild(buttonContainer);

      incompleteBookList.appendChild(bookItem);
      buttonContainer.appendChild(bookItemIsCompleteButton);

      buttonContainer.appendChild(bookItemDeleteButton);
    }
  });
}

function renderCompleteBook() {
  completeBookList.innerHTML = "";
  books.forEach((book) => {
    if (book.isComplete) {
      const bookItem = document.createElement("div");
      bookItem.setAttribute("data-testid","bookItemTitle")
      bookItem.setAttribute("data-testid", "bookItem");

      const bookItemTitle = document.createElement("h3");
      bookItemTitle.setAttribute("data-testid", "bookItemTitle");
      bookItemTitle.textContent = book.title;
      bookItem.appendChild(bookItemTitle);

      const bookItemAuthor = document.createElement("p");
      bookItemAuthor.setAttribute("data-testid", "bookItemAuthor");
      bookItemAuthor.textContent = `Penulis: ${book.author}`;
      bookItem.appendChild(bookItemAuthor);

      const bookItemYear = document.createElement("p");
      bookItemYear.setAttribute("data-testid", "bookItemYear");
      bookItemYear.textContent = `Tahun: ${book.year}`;
      bookItem.appendChild(bookItemYear);

      const buttonContainer = document.createElement("div");

      const bookItemIsCompleteButton = document.createElement("button");
      bookItemIsCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");
      bookItemIsCompleteButton.textContent = "Ubah kondisi";
      buttonContainer.appendChild(bookItemIsCompleteButton);

      const bookItemDeleteButton = document.createElement("button");
      bookItemDeleteButton.setAttribute("data-testid", "bookItemDeleteButton");	
      bookItemDeleteButton.textContent = "Hapus";
      buttonContainer.appendChild(bookItemDeleteButton);

      const bookItemEditButton = document.createElement("button");
      bookItemEditButton.setAttribute("data-testid","bookItemEditButton");
      bookItemEditButton.textContent = "Edit";
      buttonContainer.appendChild(bookItemEditButton);

      bookItemDeleteButton.addEventListener("click", () => {
        book = books.filter((b) => b.id !== book.id);
        localStorage.setItem("books", JSON.stringify(book));
        alert("Buku di hapus");
        location.reload();
        renderIncompleteBookList();
        renderCompleteBook();
      });

      bookItemIsCompleteButton.addEventListener("click", () => {
        book.isComplete = !book.isComplete;
        localStorage.setItem("books", JSON.stringify(books));
        renderCompleteBook();
        renderIncompleteBookList();
      });
      bookItem.appendChild(buttonContainer);
      buttonContainer.appendChild(bookItemIsCompleteButton);

      buttonContainer.appendChild(bookItemDeleteButton);

      completeBookList.appendChild(bookItem);
    }
  });
}

renderIncompleteBookList();
renderCompleteBook();
