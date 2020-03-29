import initApp from "./app";
import "./env";

const config = {
  dbHost: process.env.DBHOST,
  dbPort: process.env.DBPORT,
  dbName: process.env.DBNAME,
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  nodeEnv: process.env.NODE_ENV,
}
process.on("uncaughtException", err => {
  console.log(err);
})

const port = process.env.PORT || 3000;
initApp(config).then(app => {
  app.listen(port, () => console.log(`Listening on port ${port}`))
})