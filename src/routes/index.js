import express from "express";

import login from "./login";

import { requestHandler } from "./utils";

const routes = {
  "/login": login
};

const routerRegister = (router, applicationContext, method, path, cb) => {
  if (method === "GET") {
    router.get(path, requestHandler(cb, applicationContext));
  }
  if (method === "PUT") {
    router.put(path, requestHandler(cb, applicationContext));
  }
  if (method === "POST") {
    router.post(path, requestHandler(cb, applicationContext));
  }
  if (method === "DELETE") {
    router.delete(path, requestHandler(cb, applicationContext));
  }
  return router;
};

const handlerAttached = Object.keys(routes).reduce((processedRoutes, key) => {
  const router = express.Router();
  const routeHandler = routes[key];
  const registerRoute = (applicationContext, ...args) => routerRegister(router, applicationContext, ...args);
  return {
    ...processedRoutes,
    [key]: applicationContext => routeHandler((...args) => {
      return registerRoute(applicationContext, ...args)
    })
  };
}, {});

export default handlerAttached;