const booksURL = 'http://localhost:3000/books' 

fetch(booksURL)
    .then(parseJSON)
    .then(displayBooks)
    .then(displayDeleteOptions)

function parseJSON(response){
    return response.json()
}

function displayBooks(books){
    const bookListDiv = document.createElement('ul')
    bookListDiv.setAttribute('ul-type','books')
    document.body.prepend(bookListDiv)

    const listTitle = document.createElement('h2')
    listTitle.textContent = "Reading List"
    document.body.prepend(listTitle)
    
    books.forEach(book => {
        displayBook(book, bookListDiv)
    });
    return books;
}

function displayBook(book, bookListDiv){

    const bookItem = document.createElement('li')
    bookItem.textContent = book.title
    bookListDiv.append(bookItem)
}

function displayDeleteOptions(books){

    const bookListDeleteSelect = document.querySelector('#book-select')

    books.forEach (book => {
        const bookOption = document.createElement('option');
        bookOption.innerText = book.title
        bookOption.value = book.id
        bookListDeleteSelect.append(bookOption)
    })

    setActionTypeOnDeleteForm()

    return books;
}

function setActionTypeOnDeleteForm(){
    id_value = getSelectionValueOnDeleteForm()
    const bookDeleteForm = document.querySelector('body > form')
    
    id_value = parseInt(id_value)
    bookDeleteForm.action = `http://localhost:3000/books/${id_value}`
    
}

function getSelectionValueOnDeleteForm(){

    // grabs the initial value when the page loads (in this case, the "Coraline" book)
    let select_id = document.getElementById("book-select");
    let id_value = select_id.options[select_id.selectedIndex].value;

    // grabs the value of the menu drop-down selection when the user clicks on a book
    document.getElementById('book-select').addEventListener('change', function() {
        id_value = this.value;
    });
    return id_value;
}