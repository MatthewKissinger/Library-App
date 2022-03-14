console.log('Bookshelf App connected');


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

function addBookToLibrary() {

}
