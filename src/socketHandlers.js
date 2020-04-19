import mongoose from "mongoose";
import Room from "./models/Room";
import ApplicationUser from "./models/ApplicationUser";
import { joinRoomAction } from "./action";

const { ObjectId } = mongoose.Types;


const registerEvents = io => {
  return io.on('connection', async socket => {
    const { roomId, userId } = socket.handshake.query;
    const room = await Room.findOne({ _id: ObjectId(roomId) });
    if (room.players.length >= 4) {
      socket.emit(joinRoomAction.error, { error: "room is Full", room });
    } else {
      socket.join(room.roomId);
      const user = await ApplicationUser.findOne({ _id: ObjectId(userId) });
      const updateRoom = await Room.findByIdAndUpdate({ _id: ObjectId(roomId) }, {
        $push: {
          players: user
        }
      }, { new: true });
      socket.emit(joinRoomAction.success, updateRoom);
    }
    socket.on("SOCKET_MESSAGE", data => {
      io.emit('playerMessage', { name: data.userName, message: data.message });
    })
    socket.on('disconnect', () => {
      // socket.to('room1').emit('playerLeft', { players, name: socket.handshake.query.name });
    });
  })

}

export default registerEvents;