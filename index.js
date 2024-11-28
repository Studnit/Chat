const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and create an HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// When a user connects to the server
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // When the user sends a message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to all clients
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Serve the HTML content directly
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WhatsApp Clone</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                display: flex;
                height: 100vh;
                margin: 0;
            }

            .app-container {
                display: flex;
                width: 100%;
            }

            .sidebar {
                width: 250px;
                background-color: #ffffff;
                border-right: 1px solid #ddd;
                padding: 20px;
                height: 100%;
            }

            #contacts-list {
                list-style-type: none;
                padding: 0;
            }

            #contacts-list li {
                padding: 10px;
                cursor: pointer;
            }

            #contacts-list li:hover {
                background-color: #f1f1f1;
            }

            .chat-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
            }

            .chat-header {
                padding: 15px;
                background-color: #25D366;
                color: white;
            }

            .chat-box {
                flex-grow: 1;
                padding: 15px;
                background-color: #ece5dd;
                overflow-y: auto;
            }

            .chat-footer {
                padding: 15px;
                background-color: #fff;
                border-top: 1px solid #ddd;
                display: flex;
                justify-content: space-between;
            }

            #messageInput {
                width: 80%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }

            #sendButton {
                width: 15%;
                padding: 10px;
                background-color: #25D366;
                border: none;
                color: white;
                border-radius: 4px;
                cursor: pointer;
            }

            #sendButton:hover {
                background-color: #128c7e;
            }

            .message {
                margin: 10px 0;
                padding: 10px;
                background-color: #dff7cf;
                border-radius: 10px;
                max-width: 80%;
            }

            .message.user {
                background-color: #dcf8c6;
                align-self: flex-end;
            }

            .message.bot {
                background-color: #f1f0f0;
                align-self: flex-start;
            }

        </style>
    </head>
    <body>
        <div class="app-container">
            <div class="sidebar">
                <h3>Contacts</h3>
                <ul id="contacts-list">
                    <li onclick="selectContact('John Doe')">John Doe</li>
                    <li onclick="selectContact('Jane Smith')">Jane Smith</li>
                </ul>
            </div>

            <div class="chat-container">
                <div class="chat-header">
                    <h3 id="chat-header">Select a contact</h3>
                </div>
                <div class="chat-box" id="chatBox">
                </div>
                <div class="chat-footer">
                    <input type="text" id="messageInput" placeholder="Type a message..." />
                    <button id="sendButton">Send</button>
                </div>
            </div>
        </div>

        <script src="/socket.io/socket.io.js"></script>
        <script>
            const socket = io();
            const chatBox = document.getElementById('chatBox');
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');
            const chatHeader = document.getElementById('chat-header');

            function appendMessage(message, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', sender);
                messageDiv.textContent = message;
                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
            }

            function selectContact(contactName) {
                chatHeader.textContent = `Chat with ${contactName}`;
                chatBox.innerHTML = ''; // Clear previous chat
            }

            sendButton.addEventListener('click', () => {
                const message = messageInput.value.trim();
                if (message !== '') {
                    appendMessage(message, 'user');
                    socket.emit('chat message', message); // Emit message to the server
                    messageInput.value = ''; // Clear input field
                }
            });

            socket.on('chat message', (msg) => {
                appendMessage(msg, 'bot'); // Display message in chat (simulating a response)
            });
        </script>
    </body>
    </html>
    `);
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
