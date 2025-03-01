document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");

    // Open chat on icon click
    chatIcon.addEventListener("click", function () {
        chatContainer.style.display = "block";
        chatIcon.style.display = "none"; // Hide icon when chat opens
    });

    // Close chat
    closeChat.addEventListener("click", function () {
        chatContainer.style.display = "none";
        chatIcon.style.display = "block"; // Show icon when chat closes
    });

    async function getChatResponse(userMessage) {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        return data.reply;
    }

    function addMessageToChatBox(message, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
        messageDiv.innerText = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessageToChatBox(userMessage, "user");
        userInput.value = "";

        const botResponse = await getChatResponse(userMessage);
        addMessageToChatBox(botResponse, "bot");
    });
});
