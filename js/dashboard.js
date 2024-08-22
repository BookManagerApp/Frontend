import { endpointGetBooks, endpointGetGenres, endpointPostBook, endpointUpdateBook, endpointDeleteBook } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const bookTableBody = document.getElementById("book-table-body");
    const bookIdInput = document.getElementById("book-id");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publishedyearInput = document.getElementById("publishedyear");
    const genreInput = document.getElementById("genre");
    const formTitle = document.getElementById("form-title");

    function loadBooks() {
        fetch(endpointGetBooks)
            .then((response) => response.json())
            .then((responseData) => {
                const books = responseData.data;
                bookTableBody.innerHTML = "";

                books.forEach((book) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${book.id_book}</td> 
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.publishedyear}</td>
                        <td>${book.genre}</td>
                        <td>
                            <button onclick="editBook('${book.id_book}', '${book.title}', '${book.author}', '${book.publishedyear}', '${book.genre}')">Edit</button>
                            <button class="btn-delete" onclick="deleteBook('${book.id_book}')">Delete</button>
                        </td>
                    `;
                    bookTableBody.appendChild(row);
                });
            })
            .catch((error) => console.error("Error:", error));
    }

    function loadGenres() {
        fetch(endpointGetGenres)
            .then((response) => response.json())
            .then((responseData) => {
                const genres = responseData.data;
                genreInput.innerHTML = genres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
            })
            .catch((error) => console.error("Error:", error));
    }

    // Add or update book
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = parseInt(bookIdInput.value.trim(), 10);
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const publishedyear = parseInt(publishedyearInput.value.trim(), 10);
        const genre = genreInput.value.trim();
        const method = id ? "PUT" : "POST";
        const url = id ? endpointUpdateBook.replace(":id", id) : endpointPostBook;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_book: id, title, author, publishedyear, genre }),
        })
            .then((response) => response.json())
            .then((responseData) => {
                loadBooks();
                form.reset();
                bookIdInput.value = "";
                formTitle.textContent = "Add Book";
            })
            .catch((error) => console.error("Error:", error));
    });

    window.editBook = function (id, title, author, publishedyear, genre) {
        bookIdInput.value = id;
        titleInput.value = title;
        authorInput.value = author;
        publishedyearInput.value = publishedyear;
        genreInput.value = genre;
        formTitle.textContent = "Edit Book";
    };

    window.deleteBook = function (id) {
        fetch(endpointDeleteBook.replace(":id", id), {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                loadBooks();
            })
            .catch((error) => console.error("Error:", error));
    };

    // Load initial data
    loadBooks();
    loadGenres();
});
