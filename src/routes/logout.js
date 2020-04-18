import { logoutUser } from "../controllers/logout";

export const register = registerPath => [
  registerPath("GET", "/", logoutUser),
];

export default register;
