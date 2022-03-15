console.log('Bookshelf App connected');

// DOM cache

const cardContainer = document.querySelector('main');
const addBookButton = document.querySelector('#add-book-btn');

// form variables
const newBookForm = document.querySelector('form');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPageCount = document.querySelector('#pages');
const readValue = document.querySelector('#read');
const submitBookBtn = document.querySelector('#submit-new-book');


// Event Listeners

addBookButton.addEventListener('click', function() {
    toggleHideClass(newBookForm);
})

submitBookBtn.addEventListener('click', function(e) {
    e.preventDefault();
    addBookToLibrary();
    clearNewBookForm();
    toggleHideClass(newBookForm);
})

// global variables

// library array
let myLibrary = [
    {
        title: 'The Pillars of the Earth',
        author: 'Ken Follett',
        pages: 806,
        read: false
    },
    {
        title: 'The Hobbit', 
        author: 'J.R.R. Tolkien',
        pages: 310,
        read: true
    }
];

// book constructor function
function Book (title, author, pages, read) {
    this.title = title, 
    this.author = author, 
    this.pages = pages, 
    this.read = read
}

// methods

function displayLibrary(array) {
    cardContainer.innerHTML = '';

    array.forEach((book) => {
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
            readButton.classList.add('not-read')
            readButton.innerText = 'Not Read Yet'
        }

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pageTotal);
        card.appendChild(readButton);

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

    let newBook = new Book(title.value, author.value, pages.value, read);

    myLibrary.push(newBook);
    displayLibrary(myLibrary);

    console.log(newBook);
}

function clearNewBookForm() {
    title.value = '';
    author.value = '';
    pages.value = '';
}

function toggleHideClass(element) {
    element.classList.toggle('hide');
}

displayLibrary(myLibrary);
