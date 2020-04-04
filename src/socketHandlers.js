let players = 0;

const registerEvents = io => {
  return io.on('connection', socket => {
    players = players + 1;
    socket.on("SOCKET_MESSAGE", data => {
      io.emit('playerMessage', { name: data.userName, message: data.message });
    })
    socket.on('disconnect', () => {
      players = players - 1;
    });
  })

}

export default registerEvents;