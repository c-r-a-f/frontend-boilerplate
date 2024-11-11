import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });

      socket.on('todoAdded', (todo) => {
        io.emit('todoAdded', todo);
      });

      socket.on('todoUpdated', (todo) => {
        io.emit('todoUpdated', todo);
      });

      socket.on('todoDeleted', (id) => {
        io.emit('todoDeleted', id);
      });
    });
  }
  res.end();
};

export default ioHandler;
