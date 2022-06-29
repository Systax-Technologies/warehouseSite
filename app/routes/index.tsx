import { LoaderFunction, redirect } from "@remix-run/node";
import { accessToken } from "~/helpers/login-session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));

  if (session.get("isLogged")) {
    throw redirect("/dashboard");
  }

  throw redirect("/login");
};
