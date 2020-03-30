import bcrypt from "bcrypt";
import { validate } from "email-validator";
// import mongoose from "mongoose";
// import parser from "ua-parser-js";
import ApplicationUser from "../models/ApplicationUser";
// import ApplicationUserToken from "../models/ApplicationUserToken";
import {
  INVALID_EMAIL,
  USER_NOT_EXISTS,
  INVALID_PASSWORD,
  INVALID_REQUEST
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

// export const checkToken = req => {
//   const userId = req.context.getUserId();
//   return ApplicationUserToken.findOne({
//     userID: userId,
//     expiresAt: {
//       $gte: new Date()
//     },
//     token: req.cookies[COOKIE_AUTHENTICATION_KEY]
//   }).then(usertoken => {
//     if (!usertoken) {
//       return {
//         isLogin: false
//       };
//     }
//     return ApplicationUser.findOne(
//       {
//         _id: mongoose.Types.ObjectId(userId)
//       },
//       {
//         roleId: 1,
//         typeId: 1,
//         businessDomain: 1,
//         isAdmin: 1,
//         firstName: 1,
//         lastName: 1
//       }
//     )
//       .lean()
//       .then(user => {
//         const rolePromise = ApplicationRole.findOne(
//           {
//             _id: user.roleId
//           },
//           {
//             _id: 0
//           }
//         ).exec();
//         const typePromise = ApplicationUserType.findOne(
//           {
//             _id: user.typeId
//           },
//           {
//             _id: 0
//           }
//         ).exec();

//         return Promise.all([rolePromise, typePromise]).then(results => {
//           return {
//             isLogin: true,
//             isAdmin: user.isAdmin,
//             roleId: user.roleId,
//             role: results[0].name,
//             type: results[1].name,
//             ...user
//           };
//         });
//       });
//   });
// };

export default {
  loginUser
};
