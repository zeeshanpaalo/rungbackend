// import { loginUser, checkToken } from "../controllers/login";
import { loginUser } from "../controllers/login";

export const register = registerPath => [
  registerPath("POST", "/", loginUser),
  // registerPath("GET", "/check", checkToken)
];

export default register;
