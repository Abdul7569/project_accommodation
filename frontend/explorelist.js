document.addEventListener("DOMContentLoaded", function () {
    // Tab switching functionality
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(button => {
        button.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            // Remove 'active' class from all tabs and tab contents
            tabLinks.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add 'active' class to the selected tab and its content
            this.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });

    // Form handling
    const postListingBtn = document.getElementById("post-listing-btn");
    const postFormContainer = document.getElementById("post-form-container");
    const closeFormBtn = document.getElementById("close-form");
    const postForm = document.getElementById("post-form");

    // Show post form
    postListingBtn.addEventListener("click", function () {
        postFormContainer.style.display = "block";
    });

    // Hide post form
    closeFormBtn.addEventListener("click", function () {
        postFormContainer.style.display = "none";
    });

    // Handle form submission
    postForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const category = document.getElementById("category").value;
        const title = document.getElementById("title").value;
        const price = document.getElementById("price").value;
        const imageInput = document.getElementById("image-upload");
        const imageUrlInput = document.getElementById("image-url").value.trim();

        let imageUrl = "";

        if (imageInput.files.length > 0) {
            // Use uploaded image if available
            const imageFile = imageInput.files[0];
            imageUrl = URL.createObjectURL(imageFile);
        } else if (imageUrlInput) {
            // Use URL if provided and no file is uploaded
            imageUrl = imageUrlInput;
        } else {
            alert("Please upload an image or enter an image URL.");
            return;
        }

        // Create a new listing
        const newListing = document.createElement("div");
        newListing.classList.add("list-item");
        newListing.innerHTML = `
            <img src="${imageUrl}" alt="Listing Image">
            <h3>${title}</h3>
            ${price ? `<p>Price: $${price}</p>` : ""}
        `;

        // Append to the correct category
        document.getElementById(category).querySelector(".list-container").appendChild(newListing);

        // Clear form fields
        postForm.reset();

        // Hide the form
        postFormContainer.style.display = "none";
    });
});
