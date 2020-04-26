import moment from "moment";
import { HTTPError } from "../constants/errors";
import ApplicationUserToken from "../models/ApplicationUserToken";
import { v4 as uuidv4 } from 'uuid';

export const isError = err =>
  err &&
  (err instanceof Error ||
    err instanceof HTTPError ||
    err.value instanceof Error ||
    err.error);

export const isUnHandledError = err => err instanceof Error;

export const generateAuthorizationToken = async (
  existingUser,
  maxNumberOfMinutes,
  req
) => {
  const userToken = new ApplicationUserToken(
    { userId: existingUser._id, token: uuidv4(), expiresAt: moment().add(maxNumberOfMinutes, "m") }
  )
  return userToken.save().then(doc => doc);
}

const fisherYatesShuffle = (array) => {
  const arr = { ...array };
  let currentIndex = arr.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return arr;
}
const randomNumber = () => {
  const n = Math.floor(Math.random() * Math.floor(2)); // generates 0 or 1
  if (n === 0) {
    return "A";
  } else {
    return "B"
  }
}
export const generateRandomTeam = (players) => {
  const shuffledPlayers = fisherYatesShuffle(players);
  return shuffledPlayers.map((p, i) => {
    return { ...p, position: i * 90 }
  })
}