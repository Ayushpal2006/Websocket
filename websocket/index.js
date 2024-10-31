const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection event
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log('received: %s', message);

        console.log("wss.clinet" , wss.clients)
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
            console.log("clinet" , client)
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });

    // Send a message to the client
    ws.send('Welcome to the WebSocket server!');

    // Client disconnect event
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Express endpoint for testing
app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

// Start server
server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});
