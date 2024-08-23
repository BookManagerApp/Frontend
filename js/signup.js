import { endpointPostRegister } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("textInput1");
    const passwordInput = document.getElementById("textInput2");
    const roleInput = document.getElementById("roleInput"); 
    
    // Tangani pengiriman form
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleInput.value; 

        if (!email || !password || !role) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(endpointPostRegister, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    role: role
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert("Registration successful!");
                window.location.href = "login.html"; 
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
