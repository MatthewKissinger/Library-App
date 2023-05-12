
// DOM cache

const cardContainer = document.querySelector('main');
const addBookButton = document.querySelector('#add-book-btn');

// form variables
const newBookForm = document.querySelector('form');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPageCount = document.querySelector('#pages');
const readValue = document.querySelector('#read');
const notReadYet = document.querySelector('#not-read-yet');
const submitBookBtn = document.querySelector('#submit-new-book');

console.log(formTitle.value);

// Event Listeners
addBookButton.addEventListener('click', function() {
    toggleHideClass(newBookForm);
})

newBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addBookToLibrary();
    clearNewBookForm();
    toggleHideClass(newBookForm);
    
})

window.addEventListener('click', function(e) {
    removeCard(e);
    updateReadButton(e);
})

// global variables

// library array
let myLibrary = [
];

// book constructor function
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    updateReadStatus() {
        if (this.read === true) {
            this.read = false;
        } else {
            this.read = true;
        }
    }

}


let newBook1 = new Book('The Pillars of the Earth', 'Ken Follett', 806, false);

let newBook2 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);

myLibrary.push(newBook1);
myLibrary.push(newBook2);


// methods

function displayLibrary(array) {
    cardContainer.innerHTML = '';

    array.forEach((book, index) => {
        let card = document.createElement('div');
        card.classList.add('card');

        let title = document.createElement('h3');
        title.innerText = book.title;

        let author = document.createElement('h3');
        author.innerText = book.author;

        let pageTotal = document.createElement('p');
        pageTotal.classList.add('page-total');
        pageTotal.innerText = book.pages;

        let readButton = document.createElement('div');
        readButton.classList.add('read-btn');
        if (book.read === true) {
            readButton.classList.add('read');
            readButton.innerText = 'Read';
        } else {
            readButton.classList.add('not-read');
            readButton.innerText = 'Not Read Yet';
        }

        let deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerText = 'X';

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pageTotal);
        card.appendChild(readButton);
        card.appendChild(deleteButton);
        card.setAttribute('data-index', `${index}`)

        cardContainer.appendChild(card);
    }) 
}

function addBookToLibrary() {
    let read = '';

    if (readValue.checked) {
        read = true;
    } else {
        read = false;
    }

    let newBook = new Book(formTitle.value, formAuthor.value, formPageCount.value, read);

    newBook.prototype = Object.create(Book.prototype);

    myLibrary.push(newBook);
    displayLibrary(myLibrary);
}

function clearNewBookForm() {
    formTitle.value = '';
    formAuthor.value = '';
    formPageCount.value = '';
    notReadYet.checked = true;
}

function toggleHideClass(element) {
    element.classList.toggle('hide');
}

function removeCard(e) {
    if (e.target.classList.contains('delete-btn')) {
        let index = e.target.parentElement.getAttribute('data-index');
        myLibrary.splice(index, 1);
        displayLibrary(myLibrary);
    }
}

function updateReadButton(e) {
    if (e.target.classList.contains('read')) {
        let index = e.target.parentElement.getAttribute('data-index');
        myLibrary[index].updateReadStatus();
        e.target.classList.add('not-read');
        e.target.innerText = 'Not Read Yet';
    } else if (e.target.classList.contains('not-read')) {
        let index = e.target.parentElement.getAttribute('data-index');
        myLibrary[index].updateReadStatus();
        e.target.classList.add('read');
        e.target.innerText = 'Read'; 
    }

    displayLibrary(myLibrary);
}

displayLibrary(myLibrary);
