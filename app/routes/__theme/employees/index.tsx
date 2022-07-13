import { XCircleIcon } from "@heroicons/react/solid";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { BackendError } from "~/components/BackendError";
import { Breadcrumb } from "~/components/Breadcrumb";
import { accessToken } from "~/helpers/login-session.server";

type LoaderDataOnError = {
  error: true;
};

type LoaderData =
  | {
      employees: {
        id: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "WORKER";
      }[];
    }
  | LoaderDataOnError;

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));
  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    throw redirect("/login");
  }

  const response = await fetch(
    "http://192.168.103.136:3000/api/v1/warehouse/employees",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (response.ok) {
    let responseBody: any;

    try {
      responseBody = await response.clone().json();
    } catch (e) {
      return { error: true };
    }

    return responseBody;
  }

  return { error: true };
};

type ActionData = { error: boolean };

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));

  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    throw redirect("/login");
  }

  const formBody = await request.formData();
  const employeeId = formBody.get("delete-employee");

  if (employeeId == null) {
    return {
      error: true,
    };
  }

  const response = await fetch(
    `http://192.168.103.136:3000/api/v1/warehouse/employees/${employeeId}`,
    {
      method: "delete",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (response.ok) {
    return { error: false };
  } else {
    return { error: true };
  }
};

export default function Products() {
  const loaderData = useLoaderData<LoaderData>();

  if ("error" in loaderData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Breadcrumb></Breadcrumb>
        <BackendError />
      </div>
    );
  }

  const { employees } = loaderData;
  const actionData = useActionData<ActionData>();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb></Breadcrumb>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Employees</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all employees</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/employees/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Employee
          </Link>
        </div>
      </div>
      <div className="pt-3 flex flex-col">
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
                    Mmh sorry, something bad happened
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employees.map((employee) => (
                    <tr key={employee.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {`${employee.firstName} ${employee.lastName}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {employee.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <RoleBadge role={employee.role} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {employee.createdAt}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Form method="post">
                          <button
                            type="submit"
                            name="delete-employee"
                            value={employee.id}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type RoleBadgeProps = {
  role: "ADMIN" | "WORKER";
};

function RoleBadge({ role }: RoleBadgeProps) {
  if (role === "ADMIN") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {"ADMIN"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      {"WORKER"}
    </span>
  );
}
