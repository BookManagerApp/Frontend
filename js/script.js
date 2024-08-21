document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const bookTableBody = document.getElementById('book-table-body');
    const bookIdInput = document.getElementById('book-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const formTitle = document.getElementById('form-title');

    const apiUrl = 'http://localhost:3000/book';

    // Load books on page load
    function loadBooks() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                bookTableBody.innerHTML = '';
                data.data.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>
                            <button onclick="editBook('${book.id}', '${book.title}', '${book.author}')">Edit</button>
                            <button onclick="deleteBook('${book.id}')">Delete</button>
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
        const url = id ? `${apiUrl}/update/${id}` : apiUrl;

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
        fetch(`${apiUrl}/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => loadBooks())
            .catch(error => console.error('Error:', error));
    };

    // Initial load
    loadBooks();
});
