import { MailIcon, XCircleIcon } from "@heroicons/react/solid";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Breadcrumb } from "~/components/Breadcrumb";
import { hashPassword } from "~/helpers/crypto.server";
import { accessToken } from "~/helpers/login-session.server";

type ActionDataOn = {
  error: true;
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionDataOn> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));

  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    throw redirect("/login");
  }

  const formBody = await request.formData();

  const email = formBody.get("email");
  const firstName = formBody.get("first-name");
  const lastName = formBody.get("last-name");
  let role = formBody.get("role");

  if (
    email == null ||
    firstName == null ||
    lastName == null ||
    role == null ||
    typeof role !== "string"
  ) {
    return { error: true };
  }

  if (role.toLowerCase() === "admin") {
    role = "ADMIN";
  } else {
    role = "WORKER";
  }

  const password = hashPassword("changeme");

  const body = JSON.stringify({ email, firstName, lastName, role, password });

  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/warehouse/employees/employee",
    {
      method: "post",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      body,
    },
  );

  if (response.ok) {
    throw redirect("/employees");
  }

  return { error: true };
};

export default function AddProduct() {
  const actionData = useActionData<ActionDataOn>();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <Breadcrumb.Item name="employees" href="/employees" />
      </Breadcrumb>

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
                  Employee register failed
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      <Form
        action="#"
        method="post"
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y sm:space-y-5">
          <div className="flex flex-row">
            <h3 className="grow text-lg leading-6 font-xl text-gray-900">
              New Employee
            </h3>
            <div className="justify-end">
              <Link
                to="/employees"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="input"
                    name="first-name"
                    id="first-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Bart"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="input"
                    name="last-name"
                    id="last-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Simpson"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Role
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="role"
                    name="role"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="Worker"
                  >
                    <option>Worker</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
