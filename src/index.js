const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected`);
});

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

module.exports = io;
