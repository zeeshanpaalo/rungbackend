import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToDb from "./db";
import routes from "./routes";
import setCors from "./cors";
import { authenticateRequest } from "./middleware/authentication";

const init = async config => {
  await connectToDb(config);
  const app = express();
  app.disable("x-powered-by");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  await setCors(app, config);
  app.use((req, res, next) => {
    authenticateRequest(config, req, res, next);
  });

  Object.keys(routes).forEach(path => {
    app.use(path, routes[path]())
  });
  return app;
};

export default init;