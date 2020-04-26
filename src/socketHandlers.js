import mongoose from "mongoose";
import Room from "./models/Room";
import ApplicationUser from "./models/ApplicationUser";
import { joinRoomAction, socketConnectionSucess, updatedRoomsEvent, leftRoom } from "./action";
import { generateRandomTeam } from "./helpers/index";

const { ObjectId } = mongoose.Types;


const registerEvents = io => {
  io.on('connection', async socket => {
    const { userID } = socket.handshake.query;
    const user = await ApplicationUser.findOne({ userID: userID }).lean();
    socket.userID = user.userID;
    const rooms = await Room.find({}).lean();
    socket.emit(socketConnectionSucess, rooms); // send to client rooms

    socket.on(joinRoomAction.begin, async data => {
      const { roomId } = data;
      const room = await Room.findOne({ _id: ObjectId(roomId) }).lean();
      if (room.players.length >= 4) {
        socket.emit(joinRoomAction.error, { error: "room is Full", room }); // room is Full, emit the updated room details with error
      } else {
        socket.join(room._id);
        socket.roomId = room._id;
        const updateRoom = await Room.findByIdAndUpdate({ _id: ObjectId(roomId) }, {
          $push: {
            players: { ...user, position: room.players.length * 90 }
          }
        }, { new: true, lean: true });
        io.in(room._id).emit(joinRoomAction.success, updateRoom);
        const updatedRooms = await Room.find().lean();
        socket.broadcast.emit(updatedRoomsEvent, updatedRooms); // tell every other client about the update
      }
    })
    socket.on('disconnect', async () => {
      const room = await Room.findOneAndUpdate(
        { _id: ObjectId(socket.roomId) },
        {
          $pull: {
            players: { userID: socket.userID }
          }
        },
        { new: true, lean: true }
      );
      const rooms = await Room.find({}).lean();
      io.in(room._id).emit(leftRoom, room);
      socket.broadcast.emit(updatedRoomsEvent, rooms); // notify all clients about the disconnection of socket except the disconnected on, its disconnected anyways
    });
  })

}

export default registerEvents;