import { endpointPostLogin } from "./url.js";

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
            const response = await fetch(endpointPostLogin, {
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
                const text = await response.text(); // Ambil respons sebagai teks
                alert(text); // Tampilkan pesan dari server
                // Redirect atau lakukan tindakan lain setelah berhasil
                window.location.href = "dashboard.html"; // Contoh redirect ke halaman dashboard
            } else {
                const error = await response.text(); // Ambil error sebagai teks
                alert("Login failed: " + error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login.");
        }
    });
});
