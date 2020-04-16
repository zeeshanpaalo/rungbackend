import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const GameSession = new Schema({
  teamA: [],
  teamB: [],
  result: {},
  date: Date,
});

export default Mongoose.model("GameSession", GameSession, "gameSessions")