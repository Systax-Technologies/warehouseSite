import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BackendError } from "~/components/BackendError";
import { Breadcrumb } from "~/components/Breadcrumb";
import { accessToken } from "~/helpers/login-session.server";

type LoaderDataOnError = {
  error: true;
};

type LoaderData =
  | {
      customers: {
        id: string;
        email: string;
        password: string;
        createdAt: string;
        updatedAt: string;
        firstName: string;
        lastName: string;
        billingAddressId: string | null;
        shippingAddressId: string | null;
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
    "http://127.0.0.1:3000/api/v1/warehouse/customers",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
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

export default function Customers() {
  const loaderData = useLoaderData<LoaderData>();

  if ("error" in loaderData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Breadcrumb></Breadcrumb>
        <BackendError />
      </div>
    );
  }

  const { customers } = loaderData;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb></Breadcrumb>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all customers</p>
        </div>
      </div>
      <div className="pt-3 flex flex-col">
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
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Info</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Orders</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {customers.map((customer) => (
                    <tr key={customer.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {`${customer.firstName} ${customer.lastName}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {customer.createdAt}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/customers/${customer.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Info
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/customers/${customer.id}/orders`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Orders
                        </Link>
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
