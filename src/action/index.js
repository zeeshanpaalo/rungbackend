export const joinRoomAction = {
  begin: "JOIN_ROOM_BEGIN",
  success: "JOIN_ROOM_SUCCESS",
  error: "JOIN_ROOM_ERROR"
}
export const selectRung = {
  begin: "SELECT_RUNG_BEGIN",
  success: "SELECT_RUNG_SUCCESS",
  error: "SELECT_RUNG_ERROR"
}
export const leftRoom = "LEFT_ROOM";
export const socketConnectionSucess = "CONNECT_TO_SOCKET_SUCCESS";
export const updatedRoomsEvent = "ROOMS_UPDATED";

export default { joinRoomAction, socketConnectionSucess, updatedRoomsEvent, leftRoom, selectRung };
