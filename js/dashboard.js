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
        console.log("API Response:", responseData); // Lihat respons API

        const books = responseData.data; // Ambil array 'data' dari objek respons

        bookTableBody.innerHTML = "";

        books.forEach((book) => {
            console.log("Book ID:", book.ID); // Pastikan `ID` tersedia
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.ID}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publishedyear}</td>
                <td>${book.genre}</td>
                <td>
                    <button onclick="editBook('${book.ID}', '${book.title}', '${book.author}', '${book.publishedyear}', '${book.genre}')">Edit</button>
                    <button class="btn-delete" onclick="deleteBook('${book.ID}')">Delete</button>
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
        console.log("Submitting data:", { title, author, publishedyear, genre });

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, author, publishedyear, genre }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        console.error("Response text:", text);
                        throw new Error(`Failed to save the book: ${text}`);
                    });
                }
                return response.json();
            })
            .then(() => {
                loadBooks();
                form.reset();
                bookIdInput.value = "";
                formTitle.textContent = "Add Book";
                alert("Book saved successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert(`Failed to save the book: ${error.message}`);
            });
    });

    // Edit book
window.editBook = function (id, title, author, publishedyear, genre) {
    bookIdInput.value = id;
    titleInput.value = title;
    authorInput.value = author;
    publishedyearInput.value = publishedyear;
    genreInput.value = genre;
    formTitle.textContent = "Update Book";
};

// Delete book
window.deleteBook = function (id) {
    const url = endpointDeleteBook.replace(":id", id);
    fetch(url, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                return response.text().then((text) => {
                    console.error("Response text:", text);
                    throw new Error(`Failed to delete the book: ${text}`);
                });
            }
            return response.json();
        })
        .then(() => {
            loadBooks();
            alert("Book deleted successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(`Failed to delete the book: ${error.message}`);
        });
};


    loadBooks();
});
