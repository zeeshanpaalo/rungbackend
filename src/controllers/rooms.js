import mongoose from "mongoose";
import ApplicationUser from "../models/ApplicationUser";
import ApplicationUserToken from "../models/ApplicationUserToken";
import {
  INVALID_EMAIL,
  USER_NOT_EXISTS,
  INVALID_PASSWORD,
  INVALID_REQUEST,
  NOT_LOGGED_IN
} from "../constants/errors";
import {
  COOKIE_AUTHENTICATION_KEY,
} from "../constants";

export const getRoomsList = req => {
  return [{ name: "Karachi", players: 3 }]
};

export default {
  getRoomsList
};
