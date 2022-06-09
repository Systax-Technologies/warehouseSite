import { LoaderFunction, redirect } from "@remix-run/node";
import { loginSession } from "~/helpers/login-session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await loginSession.getSession(request.headers.get("Cookie"));

  if (session.get("isLogged")) {
    throw redirect("/dashboard");
  }

  throw redirect("/login");
};
