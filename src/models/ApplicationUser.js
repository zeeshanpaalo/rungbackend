import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const ApplicationUser = new Schema({
  name: String,
  email: { type: String, unique: true },
  picUrl: String,
  userID: String
});

export default Mongoose.model("ApplicationUser", ApplicationUser, "applicationUsers")