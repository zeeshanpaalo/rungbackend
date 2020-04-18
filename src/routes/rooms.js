import { getRoomsList } from "../controllers/rooms";

export const register = registerPath => [
  registerPath("GET", "/", getRoomsList),
];

export default register;
