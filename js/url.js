export const endpointGetBooks = "http://127.0.0.1:3000/books";
export const endpointGetBookById = "http://127.0.0.1:3000/book/getbyid/:id";
export const endpointPostBook = "http://127.0.0.1:3000/book/post";
export const endpointUpdateBook = "http://127.0.0.1:3000/book/update/:id";
export const endpointDeleteBook = "http://127.0.0.1:3000/book/delete/:id";
export const endpointGetGenres = "http://127.0.0.1:3000/genres";
// // search
// export const endpointGetSearch = "http://127.0.0.1:3000//search";

// Endpoint Registrasi dan Login
export const endpointPostRegister = "http://127.0.0.1:3000/register";
export const endpointPostLogin = "http://127.0.0.1:3000/login";

// Endpoint Dilindungi
export const endpointProtectedBooks = "http://127.0.0.1:3000/protected/books";
export const endpointProtectedGetBookById = "http://127.0.0.1:3000/protected/book/getbyid/:id";
export const endpointProtectedPostBook = "http://127.0.0.1:3000/protected/book/post";
export const endpointProtectedUpdateBook = "http://127.0.0.1:3000/protected/book/update/:id";
export const endpointProtectedDeleteBook = "http://127.0.0.1:3000/protected/book/delete/:id";
export const endpointSomeProtectedHandler = "http://127.0.0.1:3000/protected/endpoint";

// Endpoint Admin
export const endpointAdminOnly = "http://127.0.0.1:3000/protected/admin/admin-only-endpoint";
