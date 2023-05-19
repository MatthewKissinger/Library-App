import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    doc, 
    updateDoc, 
    addDoc, 
    deleteDoc,
    getDocs, 
    collection, 
    query 
} from "firebase/firestore";
import "./style.css";

// TODO
// Host with github

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
async function addANewDoc(book) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "libraryArray"), {
    ...book
    });
    console.log("Document written with ID: ", docRef.id);

    const docRefId = docRef.id;
    const updateDocRef = doc(db, "libraryArray", docRefId);
    await updateDoc(updateDocRef, {
        id: docRefId
    });
}

// initialize the site with collection data from a query to the firestore on first render
async function queryForDocs() {
    const colRef = query(collection(db, "libraryArray"));

    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((snap) => {
        // check to see if the docID already exists in the collection
        // if so, do not push it to myLibrary
        // else, push it to myLibrary
        
        const checkTitle = obj => obj.title === snap.data().title;

        if (myLibrary.some(checkTitle) === true) {
            return; 
        } else {
            myLibrary.push(snap.data());
        }
        
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

    array.forEach((book) => {

        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', book.id);

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

        cardContainer.appendChild(card);
    }) 
}

async function addBookToLibrary() {
    let read = '';

    if (readValue.checked) {
        read = true;
    } else {
        read = false;
    }

    let newBook = new Book(formTitle.value, formAuthor.value, formPageCount.value, read);

    // made it await for the docref ID to be added to the firestore doc
    await addANewDoc(newBook);
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
async function removeCard(e) {
    if (e.target.classList.contains('delete-btn')) {
        const docRefId = e.target.parentElement.id;
        console.log(docRefId);
        // delete from firestore
        await deleteDoc(doc(db, "libraryArray", docRefId));
        myLibrary = [];
        queryForDocs();
    }
}

// update the read value of the doc in firestore collection
// grab the title of the book -> check that string with the documents 
// re-query the database
async function updateReadButton(e) {
    if (e.target.classList.contains('read')) {
        const docRefId = e.target.parentElement.id;

        const updateDocRef = doc(db, "libraryArray", docRefId);
        await updateDoc(updateDocRef, {
        read: false
        });
        myLibrary = [];
        queryForDocs();
    } else if (e.target.classList.contains('not-read')) {
        const docRefId = e.target.parentElement.id;

        const updateDocRef = doc(db, "libraryArray", docRefId);
        await updateDoc(updateDocRef, {
        read: true
        });
        myLibrary = [];
        queryForDocs();
    } 
}



