// import { loginUser, checkToken } from "../controllers/login";
import { loginUser, loginCheck } from "../controllers/login";

export const register = registerPath => [
  registerPath("POST", "/", loginUser),
  registerPath("GET", "/check", loginCheck),
];

export default register;
