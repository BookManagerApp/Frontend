import { endpointGetBooks, endpointPostBook, endpointUpdateBook, endpointDeleteBook } from "./url.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const bookTableBody = document.getElementById('book-table-body');
    const bookIdInput = document.getElementById('book-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const formTitle = document.getElementById('form-title');

    // Load books on page load
    function loadBooks() {
        fetch(endpointGetBooks)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Lihat apa yang diterima
    
                const books = responseData.data; // Ambil array 'data' dari objek respons
    
                bookTableBody.innerHTML = '';
    
                books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.publishedyear}</td>
                        <td>${book.genre}</td>
                        <td>
                            <button onclick="editBook('${book.id}', '${book.title}', '${book.author}')">Edit</button>
                            <button class="btn-delete" onclick="deleteBook('${book.id}')">Delete</button>
                        </td>
                    `;
                    bookTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error:', error));
    }    

    // Add or update book
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = bookIdInput.value;
        const title = titleInput.value;
        const author = authorInput.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? endpointUpdateBook.replace(':id', id) : endpointPostBook;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        })
            .then(response => response.json())
            .then(() => {
                loadBooks();
                form.reset();
                bookIdInput.value = '';
                formTitle.textContent = 'Add Book';
            })
            .catch(error => console.error('Error:', error));
    });

    // Edit book
    window.editBook = function(id, title, author) {
        bookIdInput.value = id;
        titleInput.value = title;
        authorInput.value = author;
        formTitle.textContent = 'Update Book';
    };

    // Delete book
    window.deleteBook = function(id) {
        const url = endpointDeleteBook.replace(':id', id);
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => loadBooks())
            .catch(error => console.error('Error:', error));
    };

    // Initial load
    loadBooks();
});
