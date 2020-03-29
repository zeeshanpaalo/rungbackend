import { HTTPError } from "../constants/errors";

export const isError = err =>
  err &&
  (err instanceof Error ||
    err instanceof HTTPError ||
    err.value instanceof Error ||
    err.error);

export const isUnHandledError = err => err instanceof Error;