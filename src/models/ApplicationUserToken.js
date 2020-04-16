import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;
const { ObjectId } = Schema.Types;

const ApplicationUser = new Schema({
  userId: ObjectId,
  token: String,
  expiresAt: Date
});

export default Mongoose.model("ApplicationUserToken", ApplicationUser, "applicationUserTokens")