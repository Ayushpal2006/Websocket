const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for all origins
app.use(cors({
    origin: 'http://127.0.0.1:3000', // replace with your client origin
    methods: ["GET", "POST"],
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:3000", // replace with your client origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('message', (message) => {
        console.log('Received message:', message);
        socket.broadcast.emit('message', `Broadcast: ${message}`);
    });

    socket.emit('message', 'Welcome to the Socket.IO server!');

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('Socket.IO server with CORS is running');
});

server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});
