import { createCookieSessionStorage } from "@remix-run/node";

export const loginSession = createCookieSessionStorage({
  cookie: {
    name: "loginSession",
    maxAge: 3600, // 1 hour
  },
});
