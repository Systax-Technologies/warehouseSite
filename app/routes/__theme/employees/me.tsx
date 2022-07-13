import { LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { BackendError } from "~/components/BackendError";
import { Breadcrumb } from "~/components/Breadcrumb";
import { accessToken } from "~/helpers/login-session.server";

type LoaderData = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
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
    "http://192.168.103.136:3000/api/v1/warehouse/employees/me",
    {
      method: "get",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  let responseBody: any;

  try {
    responseBody = await response.clone().json();
  } catch (e) {
    if (response.status === 401) {
      return redirect("/login");
    }
    return response;
  }

  return responseBody;
};

export default function Me() {
  const loaderData = useLoaderData<LoaderData>();

  if ("error" in loaderData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Breadcrumb></Breadcrumb>
        <BackendError />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <Breadcrumb.Item href="/employees" name="employees" />
        <Breadcrumb.Item href="/employees/me" name="me" />
      </Breadcrumb>
      <h1 className="text-xl font-semibold text-gray-900">
        {`${loaderData.firstName} ${loaderData.lastName}`}
      </h1>
      <Form
        action="#"
        method="post"
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="street-address"
                    placeholder={loaderData.email}
                    readOnly
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Change password
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    autoComplete="address-level2"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex justify-end">
          <button
            type="submit"
            name="logout"
            value="logout"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Logout
          </button>

          <Link
            to="/employees"
            className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
