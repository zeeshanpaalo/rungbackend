// import bcrypt from "bcrypt";
// import { validate } from "email-validator";
// import mongoose from "mongoose";
// import parser from "ua-parser-js";
// import ApplicationUser from "../models/ApplicationUser";
// import ApplicationUserToken from "../models/ApplicationUserToken";
// import {
//   INVALID_EMAIL,
//   USER_NOT_EXISTS,
//   INVALID_PASSWORD,
//   INVALID_REQUEST
// } from "../constants/errors";
// import {
//   COOKIE_AUTHENTICATION_KEY,
//   MINUTES_FOR_ADMIN_TOKEN_VALIDITY,
//   ONE_YEAR_TOKEN_VALIDITY
// } from "../constants";
// import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../constants/activityNames";
// import { CUSTOMER } from "../constants/objectTypes";
// import ApplicationRole from "../models/ApplicationRole";
// import ApplicationUserType from "../models/ApplicationUserType";
// import { generateAuthorizationToken } from "../helpers/index";
// import { saveAuditTrailLog } from "../services/auditTrail";

export const loginUser = (req, res) => {
  console.log("insdie reqes");
  return [1, 3, 4];
  // const body = { ...req.body };
  // const { businessId, deviceID, config } = req.context;
  // const ua = parser(req.headers["user-agent"]);
  // if (!validate(body.email)) {
  //   return INVALID_EMAIL.throwPromise();
  // }
  // if (!body.password) {
  //   return INVALID_REQUEST.throwPromise();
  // }
  // return ApplicationUser.findOne({
  //   email: body.email,
  //   businessId
  // })
  //   .select(
  //     "_id +password +deletedAt isAdmin businessDomain trialCount firstName lastName"
  //   )
  //   .then(async existingUser => {
  //     if (!existingUser) return USER_NOT_EXISTS.throwPromise();
  //     if (existingUser.deletedAt) return USER_NOT_EXISTS.throwPromise(); // Return correct error
  //     const ip = req.clientIp;
  //     const ipAddress = ip === "::1" ? "127.0.0.1" : ip;
  //     const logData = {
  //       businessId,
  //       userIp: ipAddress,
  //       objectName: CUSTOMER,
  //       deviceId: deviceID,
  //       userAgent: ua,
  //       userId: existingUser._id,
  //       userName: `${existingUser.firstName} ${existingUser.lastName}`,
  //       seName: "/login",
  //       objectReferenceId: existingUser._id
  //     };
  //     if (!bcrypt.compareSync(body.password, existingUser.password)) {
  //       let updateUserQuery = { $inc: { trialCount: 1 } };
  //       if (existingUser.trialCount > 2) {
  //         updateUserQuery = { $set: { trialCount: 0 } };
  //       }

  //       return ApplicationUser.findOneAndUpdate(
  //         { _id: existingUser._id },
  //         updateUserQuery
  //       ).then(() => {
  //         res.cookie(COOKIE_AUTHENTICATION_KEY, "", {
  //           expires: new Date(0)
  //         }); // destroying cookie
  //         saveAuditTrailLog(
  //           {
  //             activityName: LOGIN_FAILURE,
  //             auditData: {
  //               id: `${existingUser.firstName} ${existingUser.lastName}`
  //             },
  //             ...logData
  //           },
  //           config
  //         );
  //         return INVALID_PASSWORD.withUserMessage(
  //           existingUser.trialCount
  //         ).throwPromise();
  //       });
  //     }
  //     const maxNumberOfMinutes = existingUser.isAdmin
  //       ? MINUTES_FOR_ADMIN_TOKEN_VALIDITY
  //       : ONE_YEAR_TOKEN_VALIDITY;
  //     const userToken = await generateAuthorizationToken(
  //       existingUser,
  //       maxNumberOfMinutes,
  //       req
  //     );
  //     const options = {
  //       maxAge: 1000 * 60 * maxNumberOfMinutes,
  //       secure: false,
  //       // httpOnly: true, // The cookie only accessible by the web server
  //       domain: req.hostname
  //     };
  //     res.cookie(COOKIE_AUTHENTICATION_KEY, userToken.token, options);
  //     saveAuditTrailLog(
  //       {
  //         activityName: LOGIN_SUCCESS,
  //         auditData: {
  //           id: `${existingUser.firstName} ${existingUser.lastName}`
  //         },
  //         ...logData
  //       },
  //       config
  //     );
  //     return ApplicationUser.findOneAndUpdate(
  //       { _id: existingUser._id },
  //       { $set: { trialCount: 0 } }
  //     ).exec();
  //   });
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
