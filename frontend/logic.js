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
        const email = document.getElementById("email")?.value;
        const password = document.getElementById("password")?.value;

        if (email && password) {
            alert("Login attempt for " + email);
            // Implement login functionality or redirect to backend
        } else {
            alert("Please enter both email and password.");
        }
    }

    // Registration function
    function register() {
        const name = document.getElementById("name")?.value;
        const email = document.getElementById("registerEmail")?.value;
        const password = document.getElementById("registerPassword")?.value;

        if (name && email && password) {
            alert("Registration attempt for " + name + " (" + email + ")");
            // Implement registration functionality or redirect to backend
        } else {
            alert("Please fill out all fields to register.");
        }
    }

    // Toggle Contact Info
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            const contactBtn = document.getElementById("contactBtn");
            const contactInfo = document.getElementById("contactInfo");
    
            if (contactBtn && contactInfo) {
                contactBtn.addEventListener("click", function () {
                    contactInfo.classList.toggle("hidden");
    
                    // Change button text
                    contactBtn.textContent = contactInfo.classList.contains("hidden") ? "Show Contact Info" : "Hide Contact Info";
                });
            } else {
                console.error("Contact button or info section not found.");
            }
        }, 100); // Wait 100ms
    });
    
    const contactBtn = document.getElementById("contactBtn");
    const contactInfo = document.getElementById("contactInfo");

    if (contactBtn && contactInfo) {
        contactBtn.addEventListener("click", function () {
            if (contactInfo.classList.contains("hidden")) {
                contactInfo.classList.remove("hidden");
                contactBtn.textContent = "Hide Contact Info";
            } else {
                contactInfo.classList.add("hidden");
                contactBtn.textContent = "Show Contact Info";
            }
        });
    } else {
        console.error("Contact button or info section not found.");
    }

    // Expose functions globally if needed
    window.toggleForm = toggleForm;
    window.showLoginForm = showLoginForm;
    window.login = login;
    window.register = register;
});
document.addEventListener("DOMContentLoaded", function () {
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

    // Sample data for listings
    const listingsData = {
        "available-rooms": [
            { image: "room1.jpg", title: "Cozy Single Room", price: "$500/month" },
            { image: "room2.jpg", title: "Shared Apartment", price: "$350/month" }
        ],
        "room-swap": [
            { image: "swap1.jpg", title: "Looking to Swap 1BHK", price: "Negotiable" },
            { image: "swap2.jpg", title: "Swap Studio for Shared", price: "Flexible" }
        ],
        "furniture-sale": [
            { image: "furniture1.jpg", title: "Study Desk for Sale", price: "$50" },
            { image: "furniture2.jpg", title: "Sofa Set - Good Condition", price: "$120" }
        ],
        "giveaways": [
            { image: "giveaway1.jpg", title: "Free Books & Stationery", price: "Free" },
            { image: "giveaway2.jpg", title: "Old Laptop - Needs Repair", price: "Free" }
        ]
    };

    function loadListings(category) {
        const container = document.querySelector(`#${category} .list-container`);
        container.innerHTML = ""; // Clear previous content

        listingsData[category].forEach(item => {
            const div = document.createElement("div");
            div.classList.add("list-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h4>${item.title}</h4>
                <p>${item.price}</p>
            `;
            container.appendChild(div);
        });
    }

    // Load default category
    loadListings("available-rooms");

    tabLinks.forEach(button => {
        button.addEventListener("click", function () {
            loadListings(this.dataset.tab);
        });
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
        console.log("Bot:", data.reply); // Log response
        return data.reply;
    } catch (error) {
        console.error("Error fetching response:", error);
    }
}
