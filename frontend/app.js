async function getChatResponse(userMessage) {
    const response = await fetch("http://127.0.0.1:5000/chat", {  // Local Flask API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    return data.reply;
}

document.getElementById("send-btn").addEventListener("click", async function() {
    let userMessage = document.getElementById("chat-input").value;
    let response = await getChatResponse(userMessage);

    let chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatMessages.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;

    document.getElementById("chat-input").value = ""; // Clear input
});
