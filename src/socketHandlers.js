import mongoose from "mongoose";
import Room from "./models/Room";
import ApplicationUser from "./models/ApplicationUser";
import { joinRoomAction, socketConnectionSucess, updatedRoomsEvent, leftRoom, selectRung, throwCard } from "./action";
import { fisherYatesShuffle } from "./helpers/index";
import { getNextTurn } from "./helpers/getNextTurn";

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
        if(updateRoom.players.length === 4) {
          // now all players are ready, distribute first 5 cards to select the rung
          const deck = ["2C","3C", "4C","5C", "6C","7C", "8C","9C", "10C","JC", "QC","KC", "AC","2H","3H", "4H","5H", "6H","7H", "8H","9H", "10H","JH", "QH","KH", "AH", "2D","3D", "4D","5D", "6D","7D", "8D","9D", "10D","JD", "QD","KD", "AD","2S","3S", "4S","5S", "6S","7S", "8S","9S", "10S","JS", "QS","KS", "AS"]
          const shuffledCards = fisherYatesShuffle(deck);
          const roomAssignedPlayers = updateRoom.players.map((p,i) => {
            return {...p, cards: shuffledCards.slice(i*13, (i+1)*13)}
          })
          const cardsAssingedRoom = await Room.findByIdAndUpdate({ _id: ObjectId(roomId) }, {
            $set: {
              players: roomAssignedPlayers,
              lastRungSelector: roomAssignedPlayers[0]._id,
              currentTurn: roomAssignedPlayers[0]._id,
              ready: true
            }
          }, { new: true, lean: true });
          io.in(room._id).emit(joinRoomAction.success, cardsAssingedRoom); // broadcast in the room
        }
      }
    })
    // action listener for Color Selection
    socket.on(selectRung.begin, async data => {
      const { rung } = data;
      console.log(rung);
      // add the color to the room
      const room = await Room.findOneAndUpdate(
          {
            _id: socket.roomId
          }, 
          {
            $set: {
              color: rung
            }
          }, 
          {new: true, lean: true}
        );
      io.in(socket.roomId).emit(selectRung.success, room); // broadcast in room including the sender
    })

    // action listener for Throw Card
    socket.on(throwCard.begin, async data => {
      const { card, whoThrew } = data;
      console.log(card, whoThrew);
      // right Here: "the function getNextTurn() will give next Player for Turn and any event to be "
      const nextPlayerId = await getNextTurn(socket.roomId, card, whoThrew);
      console.log(nextPlayerId);
      const room = await Room.findOneAndUpdate(
        { _id: ObjectId(socket.roomId) },
        {
          $set: {
            currentTurn: ObjectId(nextPlayerId),
          }
        },
        { new: true, lean: true }
      );
      io.in(socket.roomId).emit(throwCard.success, room); // broadcast in room including the sender
    })

    socket.on('disconnect', async () => {
      const room = await Room.findOneAndUpdate(
        { _id: ObjectId(socket.roomId) },
        {
          $pull: {
            players: { userID: socket.userID }
          },
          $set: {
            ready: false,
            lastRungSelector: null,
            color: null
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