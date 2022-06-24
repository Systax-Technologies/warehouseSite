import { createCookieSessionStorage } from "@remix-run/node";

export const accessToken = createCookieSessionStorage({
  cookie: {
    name: "accessToken",
    maxAge: 3600, // 1 hour
  },
});
