import { XCircleIcon } from "@heroicons/react/solid";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { accessToken } from "~/helpers/login-session.server";

type ActionDataOnError = {
  error: true;
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionDataOnError> => {
  const formBody = await request.formData();

  const email = formBody.get("email");
  const password = formBody.get("password") as string;

  if (email == null || password == null) {
    return {
      error: true,
    };
  }

  const body = JSON.stringify({
    email,
    password,
  });

  const response = await fetch(
    "http://192.168.103.136:3000/api/v1/warehouse/employees/login",
    {
      method: "post",
      body,
    }
  );

  let responseBody: any;

  try {
    responseBody = await response.json();
  } catch (_) {
    return {
      error: true,
    };
  }

  if ("accessToken" in responseBody) {
    const session = await accessToken.getSession();

    session.set("accessToken", responseBody.accessToken);
    throw redirect("/dashboard", {
      headers: {
        "Set-Cookie": await accessToken.commitSession(session),
      },
    });
  } else {
    return {
      error: true,
    };
  }
};

export default function Login() {
  const actionData = useActionData<ActionDataOnError>();

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {actionData?.error && (
          <div className="pb-3">
            <div className="rounded-md bg-red-50 p-4 border-solid border-2 border-red-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Authentication Failed
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form className="space-y-6" action="#" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
