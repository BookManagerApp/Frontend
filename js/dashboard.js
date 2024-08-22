import { endpointGetBooks, endpointPostBook, endpointUpdateBook, endpointDeleteBook } from "./url.js";

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
                console.log(responseData); // Periksa data yang diterima
    
                const books = responseData.data; // Ambil array 'data' dari objek respons
    
                bookTableBody.innerHTML = "";
    
                books.forEach((book) => {
                    console.log("Book ID:", book.id_book); // Pastikan `id_book` tersedia
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

    // Add or update book
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = bookIdInput.value;
        const title = titleInput.value.trim(); // Menghapus spasi di awal dan akhir
        const author = authorInput.value.trim();
        const publishedyear = parseInt(publishedyearInput.value.trim(), 10); // Convert to integer
        const genre = genreInput.value.trim();
        const method = id ? "PUT" : "POST";
        const url = id ? endpointUpdateBook.replace(":id", id) : endpointPostBook;

        // Print data to verify
        console.log({ id, title, author, publishedyear, genre });

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_book: id, title, author, publishedyear, genre }), // Ensure correct key
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Response Data:", responseData); // Lihat apa yang diterima
                loadBooks(); // Reload books after adding or updating
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
                loadBooks(); // Reload books after deleting
            })
            .catch((error) => console.error("Error:", error));
    };

    loadBooks();
});
