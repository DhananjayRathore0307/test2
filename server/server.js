import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import initSocket from './socket/index.js';

dotenv.config();
connectDB(); // MongoDB connection

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 
      'http://localhost:5173',
      
    
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  },
});


initSocket(io); // Socket events defined separately

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
