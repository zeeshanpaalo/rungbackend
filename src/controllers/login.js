import bcrypt from "bcrypt";
import { validate } from "email-validator";
import mongoose from "mongoose";
// import parser from "ua-parser-js";
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
  ONE_YEAR_TOKEN_VALIDITY
} from "../constants";
// import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../constants/activityNames";
// import { CUSTOMER } from "../constants/objectTypes";
// import ApplicationRole from "../models/ApplicationRole";
// import ApplicationUserType from "../models/ApplicationUserType";
import { generateAuthorizationToken } from "../helpers/index";
// import { saveAuditTrailLog } from "../services/auditTrail";

export const loginUser = (req, res) => {
  const body = { ...req.body };
  if (!validate(body.email)) {
    return INVALID_EMAIL.throwPromise();
  }
  if (!body.password) {
    return INVALID_REQUEST.throwPromise();
  }
  return ApplicationUser.findOne({
    email: body.email
  })
    .select(
      "_id password firstName lastName"
    )
    .then(async existingUser => {
      if (!existingUser) return USER_NOT_EXISTS.throwPromise();
      if (!bcrypt.compareSync(body.password, existingUser.password)) {
        return INVALID_PASSWORD.withUserMessage(
          "password wrong"
        ).throwPromise();
      }
      const maxNumberOfMinutes = ONE_YEAR_TOKEN_VALIDITY;
      const userToken = await generateAuthorizationToken(
        existingUser,
        maxNumberOfMinutes,
        req
      );
      const options = {
        maxAge: 1000 * 60 * maxNumberOfMinutes,
        secure: false,
        // httpOnly: true, // The cookie only accessible by the web server
        domain: req.hostname
      };
      res.cookie(COOKIE_AUTHENTICATION_KEY, userToken.token, options);

      return existingUser
    });
};

export const loginCheck = req => {
  return ApplicationUserToken.findOne({
    expiresAt: {
      $gte: new Date()
    },
    token: req.cookies[COOKIE_AUTHENTICATION_KEY]
  })
    .lean()
    .then(usertoken => {
      if (!usertoken) {
        return NOT_LOGGED_IN.withUserMessage(
          "User is not LoggedIn"
        ).throwPromise();
      }
      return ApplicationUser.findOne(
        {
          _id: mongoose.Types.ObjectId(usertoken.userId)
        }
      )
        .lean()
        .then(user => {
          return {
            isLoggedIn: true,
            ...user
          };
        });
    });
};

export default {
  loginUser,
  loginCheck
};
