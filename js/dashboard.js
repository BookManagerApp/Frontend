import { 
    endpointProtectedBooks,  
    endpointProtectedPostBook, 
    endpointProtectedUpdateBook, 
    endpointProtectedDeleteBook, 
    endpointGetGenres 
} from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const bookTableBody = document.getElementById("book-table-body");
    const bookIdInput = document.getElementById("book-id");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const publishedyearInput = document.getElementById("publishedyear");
    const genreInput = document.getElementById("genre");
    const formTitle = document.getElementById("form-title");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const addBookBtn = document.getElementById("add-book-btn");
    const logoutBtn = document.getElementById("logout-btn");

    // Fungsi untuk membuka modal
    function openModal() {
        modal.classList.remove("hidden");
    }

    // Fungsi untuk menutup modal
    function closeModalFn() {
        modal.classList.add("hidden");
        form.reset();
        formTitle.textContent = "Add Book";
        bookIdInput.value = "";
    }

    addBookBtn.addEventListener("click", openModal);
    closeModal.addEventListener("click", closeModalFn);

    // Fungsi untuk logout
    logoutBtn.addEventListener("click", function () {
        alert("You have logged out.");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        window.location.href = "index.html";
    });

    function fetchWithAuth(url, options = {}) {
        const token = localStorage.getItem("authToken");
        const headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        return fetch(url, {
            ...options,
            headers: headers,
        });
    }

    function loadBooks() {
        fetchWithAuth(endpointProtectedBooks)
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
                            <button class="btn-edit" onclick="editBook('${book.id_book}', '${book.title}', '${book.author}', '${book.publishedyear}', '${book.genre}')">Edit</button>
                            <button class="btn-delete" onclick="deleteBook('${book.id_book}')">Delete</button>
                        </td>
                    `;
                    bookTableBody.appendChild(row);
                });
            })
            .catch((error) => console.error("Error:", error));
    }

    function loadGenres() {
        fetchWithAuth(endpointGetGenres)
            .then((response) => response.json())
            .then((responseData) => {
                const genres = responseData.data;
                genreInput.innerHTML = genres
                    .map((genre) => `<option value="${genre}">${genre}</option>`)
                    .join("");
            })
            .catch((error) => console.error("Error:", error));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const id = parseInt(bookIdInput.value.trim(), 10);
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const publishedyear = parseInt(publishedyearInput.value.trim(), 10);
        const genre = genreInput.value.trim();
        const method = id ? "PUT" : "POST";
        const url = id ? endpointProtectedUpdateBook.replace(":id", id) : endpointProtectedPostBook;
    
        fetchWithAuth(url, {
            method: method,
            body: JSON.stringify({
                id_book: id,
                title,
                author,
                publishedyear,
                genre,
            }),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to process request");
            }
        })
        .then((responseData) => {
            loadBooks();
            closeModalFn();
            alert(id ? "Book updated successfully!" : "Book added successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to add or update book. Please try again.");
        });
    });
    

    window.deleteBook = function (id) {
        fetchWithAuth(endpointProtectedDeleteBook.replace(":id", id), {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to delete book");
            }
        })
        .then(() => {
            loadBooks();
            alert("Book deleted successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to delete book. Please try again.");
        });
    };
    

    loadBooks();
    loadGenres();
});
