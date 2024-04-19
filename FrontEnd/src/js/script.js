const booksDone = document.getElementById("books-done");
const booksUnDone = document.getElementById("books-undone");
const form = document.querySelector('form');

let title = document.getElementById("title");
let author = document.getElementById("author");
let color = document.getElementById("color");
let status = document.getElementById("status");
let image = document.getElementById("image");

let titleError = document.getElementById("titleError");
let authorError = document.getElementById("authorError");
let colorError = document.getElementById("colorError");
let statusError = document.getElementById("statusError");
let imageError = document.getElementById("imageError")

let saveButton = document.getElementById('saveButton');
let updateButton = document.getElementById('updateButton');

let booksData = [];

const isDone = (
    idBook,
    title,
    author,
    color,
    status,
    image,
    date,
) => {
    const book = document.createElement("div");
    book.className = "book";
    book.id = idBook;
    book.innerHTML = ` 
            <section>
                <div class="relative w-full h-72 ">
                    <div class="absolute w-40 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
                        <img src="${image}"/>
                    </div>
                    
                    
                    <div class="absolute w-full bottom-0 h-60 ${color} rounded-xl">
                        <div class="flex justify-between p-4">
                            <button class="text-white" onclick="edit(${idBook})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button onclick="deleteById(${idBook})" class="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
    
                        </div>
                </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <h1 class="font-bold text-xl">${title}</h1>
                    <span class="font-medium text-gray-500">${author}</span>
                </div>
            </section>
    `;
    booksDone.insertBefore(book, booksDone.firstChild);
};

const isUnDone = (
    idBook,
    title,
    author,
    color,
    status,
    image,
    date,
) => {
    const book = document.createElement("div");
    book.className = "book";
    book.id = idBook;
    book.innerHTML = ` 
        <section>
                <div class="relative w-full h-72 ">
                    <img src="${image}" class="absolute w-40 z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"/>
                    <div class="absolute w-full bottom-0 h-60 ${color} rounded-xl">
                        <div class="flex justify-between p-4">
                            <button class="text-white" onclick="edit(${idBook})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button onclick="deleteById(${idBook})" class="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
    
                        </div>
                </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <h1 class="font-bold text-xl">${title}</h1>
                    <span class="font-medium text-gray-500">${author}</span>
                </div>
            </section>
    `;
    booksUnDone.insertBefore(book, booksUnDone.firstChild);
};

function save() {

    if (
        title.value.trim().length === 0
    ) {
        titleError.innerHTML = "Title is required";
        return;
    } else {
        titleError.innerHTML = "";
    }

    if (author.value.trim().length === 0) {
        authorError.innerHTML = "Description is required";
        return;
    } else {
        authorError.innerHTML = "";
    }

    if (color.value === "Select Color") {
        colorError.innerHTML = "Color is required";
        return;
    } else {
        colorError.innerHTML = "";
    }

    if (status.value === "Select Status") {
        statusError.innerHTML = "Status is required";
        return;
    } else {
        statusError.innerHTML = "";
    }



    let image = document.getElementById("image");
    image.disabled = false;
    if (image.files.length === 0) {
        imageError.innerHTML = "Please select an image";
    } else {
        imageError.innerHTML = "";
    }

    let file = image.files[0];
    let reader = new FileReader();

    reader.onload = function() {
        let base64String = reader.result;
        const booksObj = {
            idBook: new Date().getTime().toString(),
            title: title.value,
            author: author.value,
            color: color.value,
            status: status.value,
            image: base64String,
            date: new Date().toLocaleDateString(),
        };
        booksData.push(booksObj);
        localStorage.setItem("books", JSON.stringify(booksData));

        isDone(
            booksObj.idBook,
            booksObj.title,
            booksObj.author,
            booksObj.color,
            booksObj.status,
            booksObj.image,
            booksObj.date,
        );

        isUnDone(
            booksObj.idBook,
            booksObj.title,
            booksObj.author,
            booksObj.color,
            booksObj.status,
            booksObj.image,
            booksObj.date,
        );


        form.reset();
        toggleModal("modal-id");
        location.reload();
    };

    reader.readAsDataURL(file);
}


const edit = (idBook) => {
    let books = JSON.parse(localStorage.getItem('books'));

    let book = books.find(function(book) {
        return book.idBook === idBook.toString();
    });

    if (book !== undefined) {
        title.value = book.title;
        author.value = book.author;
        color.value = book.color;
        status.value = book.status;

        saveButton.style.display = "none";
        updateButton.style.display = "block";
        image.disabled = true;

        updateButton.onclick = function() {
            book.title = title.value;
            book.author = author.value;
            book.color = color.value;
            book.status = status.value;
            book.image = book.image;
            book.date = new Date().toLocaleDateString();

            localStorage.setItem('books', JSON.stringify(books));

            location.reload();
        };

        toggleModal('modal-id');
    } else {
        alert('Data not found');
    }
};

function deleteById(idBook) {

    let books = JSON.parse(localStorage.getItem('books'));

    let filteredBooks = books.filter(function(book) {
        return book.idBook !== idBook.toString();
    });

    localStorage.setItem('books', JSON.stringify(filteredBooks));

    location.reload();
}



window.addEventListener("load", () => {
    booksData = localStorage.getItem("books")
        ? JSON.parse(localStorage.getItem("books"))
        : [];

    let doneBooks = booksData.filter(function (book) {
        return book.status === "done";
    });

    let undoneBooks = booksData.filter(function (book) {
        return book.status === "undone";
    });

    if (doneBooks.length === 0) {
        let noData = document.createElement('p');
        noData.innerHTML = 'No data available';
        booksDone.appendChild(noData);
    } else {
        doneBooks.forEach((book) => {
            isDone(
                book.idBook,
                book.title,
                book.author,
                book.color,
                book.status,
                book.image,
                book.date,
            );
        });
    }

    if (undoneBooks.length === 0){
        let noData = document.createElement('p');
        noData.innerHTML = 'No data available';
        booksUnDone.appendChild(noData);
    } else {
        undoneBooks.forEach((book) => {
            isUnDone(
                book.idBook,
                book.title,
                book.author,
                book.color,
                book.status,
                book.image,
                book.date,
            );
        });
    }
});

function toggleAddModal(modalID) {
    form.reset();
    saveButton.style.display = "block";
    updateButton.style.display = "none";
    toggleModal('modal-id');
}
function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}
