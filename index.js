console.log('Bookshelf App connected');

// DOM cache

const cardContainer = document.querySelector('main');
const addBookButton = document.querySelector('#add-book-btn');
const newBookForm = document.querySelector('form');

// Event Listeners

addBookButton.addEventListener('click', function() {
    console.log('you cliked the add a new book button');
    newBookForm.classList.toggle('hide');
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
    let newBook = new Book();
}

displayLibrary(myLibrary);
