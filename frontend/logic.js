document.addEventListener("DOMContentLoaded", function () {
    // Toggle between Login and Register forms
    function toggleForm() {
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");

        if (loginForm && registerForm) {
            clearFields(); // Clear input fields when toggling

            if (loginForm.style.display === "none") {
                loginForm.style.display = "block";
                registerForm.style.display = "none";
            } else {
                loginForm.style.display = "none";
                registerForm.style.display = "block";
            }
        } else {
            console.error("Login or Register form not found.");
        }
    }

    // Show login form and hide register form
    function showLoginForm() {
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");

        if (loginForm && registerForm) {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            clearFields();
        } else {
            console.error("Login or Register form not found.");
        }
    }

    // Clear all input fields
    function clearFields() {
        document.querySelectorAll("input").forEach(input => input.value = "");
    }

    // Login function
    function login() {
        console.log("Login function called.");
        const UserID = document.getElementById("UserID")?.value;
        const password = document.getElementById("password")?.value;
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.textContent = "";

        console.log("UserID:", UserID);
        console.log("password:", password);

        if (typeof UserID !== 'string') {
            errorMessageDiv.textContent = "User ID must be a string.";
            console.log("User ID error.");
            return;
        }

        if (typeof password !== 'string') {
            errorMessageDiv.textContent = "Password must be a string.";
            console.log("Password error.");
            return;
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,10}).*$/;

        if (!passwordRegex.test(password)) {
            errorMessageDiv.textContent = "Password must be 8-10 characters long, contain at least one number, and one special character.";
            console.log("Password regex error.");
            return;
        }

        if (UserID && password) {
            alert("Login attempt for " + UserID);
            // Replace with actual server login logic
        } else {
            errorMessageDiv.textContent = "Please enter both User ID and password.";
            console.log("Missing fields error.");
        }
    }

   // Registration function
   function register() {
    const name = document.getElementById("name")?.value;
    const UserID = document.getElementById("UserID")?.value;
    const password = document.getElementById("Password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;
    const contact = document.getElementById("contactInfo")?.value;
    const gender = document.getElementById("gender")?.value; // Get gender
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.textContent = "";

    if (typeof name !== 'string') {
        errorMessageDiv.textContent = "Name must be a string";
        return;
    }

    // UserID Validation: Starts with an alphabet
    if (typeof UserID !== 'string' || !/^[a-zA-Z]/.test(UserID)) {
        errorMessageDiv.textContent = "User ID must start with an alphabet.";
        console.log("User ID error.");
        return;
    }

    if (typeof password !== 'string') {
        errorMessageDiv.textContent = "Password must be a string.";
        console.log("Password error.");
        return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,10}).*$/;

    if (!passwordRegex.test(password)) {
        errorMessageDiv.textContent = "Password must be 8-10 characters long, contain at least one number, and one special character.";
        console.log("Password regex error.");
        return;
    }

    if (password !== confirmPassword) {
        errorMessageDiv.textContent = "Passwords do not match.";
        return;
    }

    // Contact Validation
    if (!contact || contact.length !== 10 || !/^\d{10}$/.test(contact)) {
        errorMessageDiv.textContent = "Contact must be 10 digits.";
        return;
    }

    if (name && UserID && password && contact && gender) { // Added gender check
        const userData = {
            name: name,
            UserID: UserID,
            password: password,
            contact: contact,
            gender: gender, // Include gender in userData
        };

        fetch("http://127.0.0.1:5000/register", { // Replace '/register' with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Registration successful:', data);
            alert('Registration successful!'); // Or handle success as needed
            // Optionally, redirect the user or clear the form.
        })
        .catch(error => {
            console.error('Registration failed:', error);
            errorMessageDiv.textContent = 'Registration failed. Please try again.'; // Display error to user
        });
    } else {
        errorMessageDiv.textContent = "Please fill out all fields to register.";
    }
}

    // Toggle Contact Info
    const contactBtn = document.getElementById("contactBtn");
    const contactInfo = document.getElementById("contactInfo");

    // if (contactBtn && contactInfo) {
    //     contactBtn.addEventListener("click", function () {
    //         contactInfo.classList.toggle("hidden");

    //         // Change button text
    //         contactBtn.textContent = contactInfo.classList.contains("hidden") ? "Show Contact Info" : "Hide Contact Info";
    //     });
    // } else {
    //     console.error("Contact button or info section not found.");
    // }

    // Tab Functionality
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons and tabs
            tabLinks.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(tab => tab.classList.remove("active"));

            // Add active class to the clicked button and corresponding tab
            this.classList.add("active");
            document.getElementById(this.dataset.tab).classList.add("active");
        });
    });

    async function getChatResponse(userMessage) {
        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Bot:", data.reply);
            return data.reply;
        } catch (error) {
            console.error("Error fetching response:", error);
            // Add error display to user here.
        }
    }

    // Expose functions globally if needed
    window.toggleForm = toggleForm;
    window.showLoginForm = showLoginForm;
    window.login = login;
    window.register = register;
    window.getChatResponse = getChatResponse;
});