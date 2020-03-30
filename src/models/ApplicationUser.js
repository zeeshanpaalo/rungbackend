import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const ApplicationUser = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String
});

export default Mongoose.model("ApplicationUser", ApplicationUser, "applicationUsers")