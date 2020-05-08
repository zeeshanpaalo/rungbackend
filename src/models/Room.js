import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;
const { ObjectId } = Schema.Types;

const Room = new Schema({
  name: String,
  players: [],
  lastRungSelector: ObjectId,
  ready: {type: Boolean, default: false},
  color: { type : String, enum: ["HEARTS", "DIAMONDS", "SPADES", "CLUBS", null]},
  currentTurn: ObjectId
});

export default Mongoose.model("Room", Room, "rooms")