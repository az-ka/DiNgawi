const inputBookForm = document.querySelector('#inputBook');

const inputBookTitle = document.querySelector('#inputBookTitle');
const inputBookAuthor = document.querySelector('#inputBookAuthor');
const inputBookYear = document.querySelector('#inputBookYear');
const inputBookIsComplete = document.querySelector('#inputBookIsComplete');

const books = [];

inputBookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const bookTitle = inputBookTitle.value;
    const bookAuthor = inputBookAuthor.value;
    const bookYear = inputBookYear.value;
    const bookIsComplete = inputBookIsComplete.checked;

    const book = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: bookTitle,
        author: bookAuthor,
        year: parseInt(bookYear),
        isComplete: bookIsComplete
    };

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

    inputBookTitle.value = '';
    inputBookAuthor.value = '';
    inputBookYear.value = '';
    inputBookIsComplete.checked = false;

    alert('Buku berhasil ditambahkan!');
    renderBooks(book);
})

const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
const completeBookshelfList = document.getElementById("completeBookshelfList");

function renderBook(book, isComplete) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookItem.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Penulis: ${book.author}`;
    bookItem.appendChild(bookAuthor);

    const bookYear = document.createElement("p");
    bookYear.textContent = `Tahun: ${book.year}`;
    bookItem.appendChild(bookYear);

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");

    const bookButton = document.createElement("button");
    bookButton.classList.add("red");
    bookButton.textContent = "Hapus buku";
    bookButton.addEventListener("click", function () {
        deleteBook(book);
    });
    bookAction.appendChild(bookButton);

    if (isComplete) {
        const bookButton = document.createElement("button");
        bookButton.classList.add("green");
        bookButton.textContent = "Belum selesai di Baca";
        bookButton.addEventListener("click", function () {
            undoBook(book);
        });
        bookAction.appendChild(bookButton);
    } else {
        const bookButton = document.createElement("button");
        bookButton.classList.add("green");
        bookButton.textContent = "Selesai dibaca";
        bookButton.addEventListener("click", function () {
            completeBook(book);
        });
        bookAction.appendChild(bookButton);
    }

    bookItem.appendChild(bookAction);

    if (isComplete) {
        completeBookshelfList.appendChild(bookItem);
    } else {
        incompleteBookshelfList.appendChild(bookItem);
    }
}

function renderBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    for (const book of books) {
        renderBook(book, book.isComplete);
    }
}

function deleteBook(book) {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    const index = books.findIndex((b) => b.title === book.title && b.author === book.author && b.year === book.year && b.isComplete === book.isComplete);
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
}

function completeBook(book) {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    const index = books.findIndex((b) => b.title === book.title && b.author === book.author && b.year === book.year && b.isComplete === book.isComplete);
    if (index !== -1) {
        books[index].isComplete = true;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
}

function undoBook(book) {
    const books = JSON.parse(localStorage.getItem("books")) || [];

    const index = books.findIndex((b) => b.title === book.title && b.author === book.author && b.year === book.year && b.isComplete === book.isComplete);
    if (index !== -1) {
        books[index].isComplete = false;
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
    }
}

renderBooks();