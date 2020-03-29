export class HTTPError {
  constructor(name, httpCode, userMessage) {
    this.name = name;
    this.httpCode = httpCode;
    this.userMessage = userMessage;
  }

  getName() {
    return this.name;
  }

  getHTTPCode() {
    return this.httpCode;
  }

  getUserMessage() {
    return this.userMessage;
  }

  withUserMessage(userMessage) {
    this.userMessage = userMessage;
    return this;
  }

  throwPromise() {
    // Can not return reject becuase reject needs error
    return Promise.reject(this);
  }

  send(res) {
    if (!res) return null;
    return res.status(this.httpCode).send({ error: this.userMessage });
  }
}

export const INVALID_EMAIL = new HTTPError(
  "INVALID_EMAIL",
  400,
  "Invalid Email"
);
export const EMAIL_ALREADY_EXISTS = new HTTPError(
  "EMAIL_ALREADY_EXISTS",
  400,
  "Email already exists"
);

export const AUTHENTICATION_FAILED = new HTTPError(
  "EMAIL_ALREADY_EXISTS",
  401,
  "Authentication Failed"
);

export const USER_NOT_EXISTS = new HTTPError(
  "USER_NOT_EXISTS",
  404,
  "User not exist"
);

export const INVALID_PASSWORD = new HTTPError(
  "INVALID_PASSWORD",
  401,
  "Invalid Password"
);

export const INVALID_REQUEST = new HTTPError(
  "INVALID_REQUEST",
  400,
  "Invalid request"
);

export const NON_ADMIN_REQUEST = new HTTPError(
  "Access Denied! Non Admin Request is rejectedT",
  400,
  "Access Denied! Non Admin Request is rejected"
);

export const NOT_EXIST = new HTTPError(
  "NOT_EXIST",
  404,
  "Desired Data Not Exist"
);

export const POST_FAILED = new HTTPError("POST_FAILURE", 403, "Post failed");

export const PRODUCT_NOT_EXIST = NOT_EXIST.withUserMessage("Product Not Exist");

export const INVALID_ID = INVALID_REQUEST.withUserMessage(
  "Invalid resource id"
);

export default {
  INVALID_EMAIL,
  EMAIL_ALREADY_EXISTS,
  AUTHENTICATION_FAILED,
  USER_NOT_EXISTS,
  INVALID_PASSWORD,
  INVALID_REQUEST,
  NOT_EXIST,
  POST_FAILED,
  PRODUCT_NOT_EXIST,
  INVALID_ID
};
