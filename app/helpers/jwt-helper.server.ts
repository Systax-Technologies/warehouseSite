import { sign } from "jsonwebtoken";

export const createJwt = (payload: object) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (jwtSecret == null) {
    throw new Error("JWT_SECRET is not defined");
  }

  return sign(payload, jwtSecret);
};
