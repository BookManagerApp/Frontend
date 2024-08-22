import { endpointGetBooks } from "./url.js";

document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.getElementById('book-container');

    // Load books on page load
    function loadBooks() {
        fetch(endpointGetBooks)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
    
                const books = responseData.data; // Ambil array 'data' dari objek respons
    
                bookContainer.innerHTML = '';
    
                books.forEach(book => {
                    const bookCard = document.createElement('div');
                    bookCard.className = 'w-full md:w-1/2 lg:w-1/3 p-4';
                    bookCard.innerHTML = `
                        <div class="bg-white border border-orange-100 hover:border-orange-500 transition duration-200 rounded-2xl h-auto p-4">
                            <div class="pt-4 pb-2 px-4">
                                <h2 class="font-bold font-heading mb-2">${book.title}</h2>
                                <p class="text-gray-500 text-sm mb-4">${book.author}</p>
                                <div class="flex flex-wrap items-center gap-2">
                                    <p class="text-gray-500 text-xs">Published Year</p>
                                    <p class="text-gray-500 text-xs">${book.publishedyear}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                        <circle cx="2" cy="2" r="2" fill="#B8B8B8"></circle>
                                    </svg>
                                    <div class="py-1 px-2 rounded-md bg-orange-50 border border-orange-100 text-xs font-medium text-orange-500 inline-block">${book.genre}</div>
                                </div>
                            </div>
                        </div>
                    `;
                    bookContainer.appendChild(bookCard);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    loadBooks();
});
