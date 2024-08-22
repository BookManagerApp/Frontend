import { endpointPostRegister } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen form dan input
    const form = document.querySelector("form");
    const emailInput = document.getElementById("textInput1");
    const passwordInput = document.getElementById("textInput2");
    
    // Tangani pengiriman form
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Mencegah pengiriman form default

        // Ambil nilai input
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validasi input
        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            // Kirim data ke endpoint API
            const response = await fetch(endpointPostRegister, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Cek apakah respons OK
            if (response.ok) {
                const data = await response.json();
                alert("Registration successful!");
                // Redirect atau lakukan tindakan lain setelah berhasil
                window.location.href = "login.html"; // Contoh redirect ke halaman login
            } else {
                const error = await response.text();
                alert("Registration failed: " + error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration.");
        }
    });
});
