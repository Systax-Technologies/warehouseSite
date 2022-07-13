import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useCatch } from "@remix-run/react";
import { Breadcrumb } from "~/components/Breadcrumb";
import { accessToken } from "~/helpers/login-session.server";

type LoaderDataOnError = {
  error: true;
};

type LoaderData =
  | {
      id: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      firstName: string;
      lastName: string;
      billingAddressId: string | null;
      shippingAddressId: string | null;
    }
  | LoaderDataOnError;

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));
  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    throw redirect("/login");
  }

  const productId = params.productId;

  if (productId == null) {
    throw redirect("/products");
  }

  const response = await fetch(
    `http://192.168.103.136:3000/api/v1/warehouse/products/${productId}`,
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
  } else {
    throw response;
  }
};

export default function EditProduct() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <Breadcrumb.Item name={"Products"} href={"/products"} />
      </Breadcrumb>
      <h1>Edit Product</h1>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            {caught.status}
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {caught.statusText}
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
