import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { accessToken } from "~/helpers/login-session.server";

type LoaderData = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  role: Role;
};

type Role = "ADMIN" | "WORKER";

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));

  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    return redirect("/login");
  }

  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/warehouse/employees/employee",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  let responseBody: any;

  try {
    responseBody = await response.clone().json();
  } catch (e) {
    return response;
  }

  return responseBody;
};

export default function Theme() {
  const loaderData = useLoaderData<LoaderData>();

  return <Layout isAdmin={loaderData.role === "ADMIN"} />;
}
