const socketIO = require('socket.io');

let connection = null;

class Socket {
  constructor() {
    this.socket = null;
  }

  connect(server) {
    const io = socketIO(server);
    io.on('connection', (socket) => {
      this.socket = socket;
      this.socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });

      console.log(`New socket connection: ${socket.id}`);
    });
  }

  sendEvent(event, data) {
    this.socket.emit(event, data);
  }

  registerEvent(event, handler) {
    this.socket.on(event, handler);
  }

  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }

  static getConnection() {
    if (!connection) {
      throw new Error('no active connection');
    }
    return connection;
  }
}

module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection,
};
