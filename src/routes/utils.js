import { isError, isUnHandledError } from "../helpers";

const sendSuccessJSON = (res, json) => res.send(json);

const sendError = (req, res, error) => {
  if (isUnHandledError(error)) {
    console.log("This is an Unhandled Error");
  }
  const httpCode = error.getHTTPCode && error.getHTTPCode();
  if (httpCode) {
    return error.send(res);
  }
  console.log("is a 500 Error", error);
  return res.status(500).send({ error });
}

const sendJSONResponse = (req, res, json) => isError(json) ? sendError(req, res, json) : sendSuccessJSON(res, json);

export const requestHandler = (callback, applicationContext) => (req, res) => {
  const returnJSONError = json => sendJSONResponse(req, res, json);
  const returnError = err => sendError(req, res, err);
  try {
    const result = callback(req, res, applicationContext);
    Promise.resolve(result)
      .then(returnJSONError)
      .catch(returnError);
  } catch (e) {
    console.log(e);
    sendError(req, res, e);
  }
};

export default {
  requestHandler
};