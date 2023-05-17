import { initializeApp } from 'firebase/app';
import { getFirestore, doc, addDoc, getDocs, collection, query } from "firebase/firestore";

// TODO
// 1) add a new book to the firestore database
// 2) fix the update read status function 
// 3) fix the remove book function 

// global variables

// library array
let myLibrary = [];

//Firebase setup

const firebaseConfig = {
    apiKey: "AIzaSyDFcqkaBFwQWLOqGW-9ncH0EQTKg-G07bU",
    authDomain: "library-top-app.firebaseapp.com",
    projectId: "library-top-app",
    storageBucket: "library-top-app.appspot.com",
    messagingSenderId: "423646578385",
    appId: "1:423646578385:web:95fc2e751bdced64a5a7f0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// reference to the libraryArray collection 
const libraryArray = collection(db, "libraryArray");

// function to add a new doc to the firestore and re-render the page to show the new doc
function addANewDoc(book) {

}

// initialize the site with collection data from a query to the firestore on first render
async function queryForDocs() {
    const colRef = query(collection(db, "libraryArray"));

    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((snap) => {
        console.log(snap.data());
        myLibrary.push(snap.data());
    })
    displayLibrary(myLibrary);
    console.log(myLibrary);
}
queryForDocs();

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

// book constructor function
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

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

    addANewDoc(newBook);
    queryForDocs();
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

// grab the title of the book -> check that string with the documents in the firestore collection
// remove that doc from the firestore and re-query the database
function removeCard(e) {
    if (e.target.classList.contains('delete-btn')) {
        let index = e.target.parentElement.getAttribute('data-index');
        myLibrary.splice(index, 1);
        displayLibrary(myLibrary);
    }
}

// update the read value of the doc in firestore collection
// grab the title of the book -> check that string with the documents 
// re-query the database
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



