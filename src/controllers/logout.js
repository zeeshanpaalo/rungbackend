import mongoose from "mongoose";
import ApplicationUser from "../models/ApplicationUser";
import moment from "moment";
import ApplicationUserToken from "../models/ApplicationUserToken";
import {
  NOT_LOGGED_IN
} from "../constants/errors";
import {
  COOKIE_AUTHENTICATION_KEY,
} from "../constants";

export const logoutUser = (req, res) => {
  return ApplicationUserToken.findOneAndUpdate({
    expiresAt: {
      $gte: new Date()
    },
    token: req.cookies[COOKIE_AUTHENTICATION_KEY]
  },
    { expiresAt: moment().subtract(2, "days") },
    { new: true }
  )
    .lean()
    .then(usertoken => {
      if (!usertoken) {
        return NOT_LOGGED_IN.withUserMessage(
          "User is already Logged out"
        ).throwPromise();
      }
      res.cookie(COOKIE_AUTHENTICATION_KEY, "");
      return {}
    });
};

export default {
  logoutUser,
};
