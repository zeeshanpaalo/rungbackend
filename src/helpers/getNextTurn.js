import mongoose from "mongoose";
import Room from "../models/Room";

const { ObjectId } = mongoose.Types;

export const getNextTurn = async (roomId, card, whoThrew) => {
    console.log(roomId);
    const room = await Room.findByIdAndUpdate({ _id: ObjectId(roomId) }, {
        $pull: {
            "players.$[].cards": card
        },
        $push: {
          track: { playerId: ObjectId(whoThrew), card: card }
        }
      }, { new: true, lean: true });
    console.log(room);
    if(room.track.length % 4 === 0) {
        console.log("full house");
        return;
    }
    const currentPlayerIndex = room.players.findIndex((element) => element._id.equals(ObjectId(whoThrew)));
    console.log(currentPlayerIndex);
    const nextPlayerIndex = currentPlayerIndex === 3? 0: currentPlayerIndex + 1;
    return room.players[nextPlayerIndex]._id; 
}