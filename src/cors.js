import cors from "cors";

const localApps = {
  "http://localhost:8080": true,
  "https://rungfrontend.herokuapp.com/": true
};

const getWhiteList = () => {
  return { ...localApps };
};

const corsOptions = whiteList => {
  return {
    origin: (origin, callback) => {
      console.log(`Request Origin ${origin}`);
      const requestOrigin = origin || '';
      if (whiteList[requestOrigin] || requestOrigin.indexOf("localhost") > -1) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
    credentials: true
  }
};

export const setCors = async (app, config) => {
  const whiteList = getWhiteList();
  if (config.nodeEnv !== "test") {
    app.use(cors(corsOptions(whiteList)));
  }
};

export default setCors;