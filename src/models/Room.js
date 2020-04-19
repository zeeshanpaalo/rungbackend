import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const Room = new Schema({
  name: String,
  players: []
});

export default Mongoose.model("Room", Room, "rooms")