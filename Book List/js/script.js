let book_name = document.querySelector('#book-name');
let author_name = document.querySelector('#author-name');
let isbn = document.querySelector('#isbn');
let table = document.querySelector('#table');


document.querySelector('#btn').addEventListener('click', insertNewBook);
table.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', getBooks);

class Book {
    constructor(author_name, book_name, isbn) {
        this.author_name = author_name;
        this.book_name = book_name;
        this.isbn = isbn;
    }
}

function insertNewBook(e) {
    let row = document.createElement('tr');
    if (author_name.value === '' || book_name.value === '' || isbn.value === '') {
        showAlert('Please fill in all the field to add a new book!', 'error');
    }
    else {
        let b1 = new Book(author_name.value, book_name.value, isbn.value);
        let temp_author_name = document.createElement('td');
        temp_author_name.innerHTML = b1.author_name;
        let temp_book_name = document.createElement('td');
        temp_book_name.innerHTML = b1.book_name;
        let temp_isbn = document.createElement('td');
        temp_isbn.innerHTML = b1.isbn;
        let temp_delete_button = document.createElement('td');
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        temp_delete_button.appendChild(link);
        row.appendChild(temp_book_name);
        row.appendChild(temp_author_name);
        row.appendChild(temp_isbn);
        row.appendChild(temp_delete_button);
        table.appendChild(row);
        book_name.value = '';
        author_name.value = '';
        isbn.value = '';
        saveToLocalStorage(b1);
        showAlert('New book added!', 'success')
        e.preventDefault(); //Prevents page reload for submit button of a form
    }
}

function deleteBook(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let parent = e.target.parentElement.parentElement;
            let b1 = new Book(parent.children[1].textContent, parent.children[0].textContent, parent.children[2].textContent);
            parent.remove();
            deleteFromLocalStorage(b1);
            showAlert('Book deleted successfully!', 'success');
        }
    }
}

function saveToLocalStorage(b) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(b);
    localStorage.setItem('books', JSON.stringify(books));
}

function deleteFromLocalStorage(b) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach((book, index) => {
        if (b.isbn == book.isbn) {
            books.splice(index, 1);
        }
    })
    localStorage.setItem('books', JSON.stringify(books));
}

function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(book => {
        let row = document.createElement('tr');
        let temp_author_name = document.createElement('td');
        temp_author_name.innerHTML = book.author_name;
        let temp_book_name = document.createElement('td');
        temp_book_name.innerHTML = book.book_name;
        let temp_isbn = document.createElement('td');
        temp_isbn.innerHTML = book.isbn;
        let temp_delete_button = document.createElement('td');
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        temp_delete_button.appendChild(link);
        row.appendChild(temp_book_name);
        row.appendChild(temp_author_name);
        row.appendChild(temp_isbn);
        row.appendChild(temp_delete_button);
        table.appendChild(row);
    })
}

function showAlert(message, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');
    container.insertBefore(div, book_name);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000)
}