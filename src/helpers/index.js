import { HTTPError } from "../constants/errors";
import ApplicationUserToken from "../models/ApplicationUserToken";
import { v4 as uuidv4 } from 'uuid';

export const isError = err =>
  err &&
  (err instanceof Error ||
    err instanceof HTTPError ||
    err.value instanceof Error ||
    err.error);

export const isUnHandledError = err => err instanceof Error;

export const generateAuthorizationToken = async (
  existingUser,
  maxNumberOfMinutes,
  req
) => {
  const userToken = new ApplicationUserToken({ userId: existingUser._id, token: uuidv4() })
  return userToken.save().then(doc => doc);
}