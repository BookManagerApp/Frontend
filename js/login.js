import { endpointPostLogin } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("textInput1");
    const passwordInput = document.getElementById("textInput2");
    
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Mencegah pengiriman form default

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
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

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    window.location.href = "dashboard.html";
                } else {
                    alert("Login failed: No token received");
                }
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
