import { endpointGetBooks, endpointGetGenres } from "./url.js";

document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.getElementById('book-container');
    const genreTabs = {
        'All Genre': document.getElementById('tab-all'),
        'Historical': document.getElementById('tab-historical'),
        'Romance': document.getElementById('tab-romance'),
        'Fiction': document.getElementById('tab-fiction'),
        'Science Fiction': document.getElementById('tab-scifi')
    };

    let selectedGenre = 'All Genre'; // Default genre

    function loadGenres() {
        fetch(endpointGetGenres)
            .then(response => response.json())
            .then(responseData => {
                const genres = responseData.data;
                // Add 'All Genre' option dynamically
                const allGenresOption = document.createElement('option');
                allGenresOption.value = 'All Genre';
                allGenresOption.textContent = 'All Genre';
                genreInput.appendChild(allGenresOption);
                genres.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre;
                    option.textContent = genre;
                    genreInput.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function loadBooks(genre = 'All Genre') {
        fetch(endpointGetBooks)
            .then(response => response.json())
            .then(responseData => {
                const books = responseData.data;

                bookContainer.innerHTML = '';

                const filteredBooks = genre === 'All Genre' ? books : books.filter(book => book.genre === genre);

                filteredBooks.forEach(book => {
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

    // Event listeners for genre tabs
    Object.keys(genreTabs).forEach(genre => {
        genreTabs[genre].addEventListener('click', () => {
            selectedGenre = genre;
            loadBooks(selectedGenre);
        });
    });

    loadGenres(); // Panggil fungsi untuk memuat genre
    loadBooks(); // Panggil fungsi untuk memuat buku
});
