let noOfPlayers = 0;
let players = [];

const registerEvents = io => {
  return io.on('connection', socket => {
    noOfPlayers = noOfPlayers + 1;
    console.log(noOfPlayers);
    console.log(socket.handshake.query);
    players.push(socket.handshake.query.name);
    socket.join("room1");
    io.in("room1").emit("playerJoined", { players })
    socket.on("SOCKET_MESSAGE", data => {
      io.emit('playerMessage', { name: data.userName, message: data.message });
    })
    socket.on('disconnect', () => {
      console.log("disconnecting");
      console.log(socket.handshake.query);
      noOfPlayers = noOfPlayers - 1;
      players.pop(socket.handshake.query.name);
      console.log(noOfPlayers);
      socket.to('room1').emit('playerLeft', { players, name: socket.handshake.query.name });
    });
  })

}

export default registerEvents;