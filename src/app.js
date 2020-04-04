import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import socket from "socket.io";
import http from "http";
import registerEvents from "./socketHandlers";
import connectToDb from "./db";
import routes from "./routes";
import setCors from "./cors";
import { authenticateRequest } from "./middleware/authentication";

const init = async config => {
  await connectToDb(config);
  const app = express();
  const server = http.Server(app);
  const io = socket(server);
  registerEvents(io);
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
  return server;
};

export default init;