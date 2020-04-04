import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;
const connectToDb = async config => {
  const dbHost = config.dbHost || "localhost";
  const dbPort = config.dbPort || "27017";
  const dbName = config.dbName || "testdb";
  const userName = config.userName || "";
  const password = config.password || "";
  // const url = `mongodb://${userName}:${password}@${dbHost}:${dbPort}/${dbName}`;
  const url = "mongodb://paalo:abc123@ds151943.mlab.com:51943/rung"
  console.log(url);
  try {
    Mongoose.set("useFindAndModify", false);
    Mongoose.set("useCreateIndex", true);
    await Mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.error(err);
    console.log("Failed: Connection to Mongo Failed");
  }
};

export default connectToDb;
