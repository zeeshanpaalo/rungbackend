import Room from "../models/Room";

export const getRoomsList = async req => {
  return Room.find().lean();
};

export default {
  getRoomsList
};
