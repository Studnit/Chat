// Connect to Socket.io server
const socket = io();

// Variables for chat interaction
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");

// Function to append a message to the chat
function appendMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Event listener for sending messages
sendMessageButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
        appendMessage(message, "user");
        socket.emit("chat message", message); // Emit the message to the server
        messageInput.value = ""; // Clear the input
    }
});

// Event listener for enter key
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessageButton.click();
    }
});

// Listen for incoming messages from the server
socket.on("chat message", (msg) => {
    appendMessage(msg, "bot"); // Display the message from any user (simulated bot response)
});
