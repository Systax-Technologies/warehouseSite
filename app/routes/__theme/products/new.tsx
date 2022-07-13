import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Breadcrumb } from "~/components/Breadcrumb";
import { accessToken } from "~/helpers/login-session.server";

type ActionDataOnError =
  | {
      error: true;
    }
  | {
      inputValidationError: true;
    };

export const action: ActionFunction = async ({
  request,
}): Promise<ActionDataOnError> => {
  const session = await accessToken.getSession(request.headers.get("Cookie"));

  const jwt = session.get("accessToken");

  if (jwt == null || typeof jwt !== "string") {
    throw redirect("/login");
  }

  const formBody = await request.formData();

  const model = formBody.get("model");
  const description = formBody.get("description");
  const imageUrl = formBody.get("image-url");
  const color = formBody.get("color");
  const formPrice = formBody.get("price");
  const size = formBody.get("size");

  if (
    model == null ||
    description == null ||
    imageUrl == null ||
    color == null ||
    formPrice == null ||
    size == null ||
    typeof model !== "string" ||
    typeof description !== "string" ||
    typeof imageUrl !== "string" ||
    typeof color !== "string" ||
    typeof formPrice !== "string" ||
    typeof size !== "string"
  ) {
    return { error: true };
  }

  let price: number;
  try {
    price = Number(formPrice);
  } catch (_) {
    return {
      inputValidationError: true,
    };
  }

  const body = JSON.stringify({
    model,
    description,
    imageUrl: imageUrl.split(",").map((el) => el.trim()),
    color,
    price,
    size,
  });

  const response = await fetch(
    "http://192.168.103.136:3000/api/v1/warehouse/products",
    {
      method: "post",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      body,
    }
  );

  if (response.ok) {
    throw redirect("/products");
  }

  return { error: true };
};

export default function AddProduct() {
  const actionData = useActionData<ActionDataOnError>();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb>
        <Breadcrumb.Item name={"Products"} href={"/products"} />
      </Breadcrumb>

      {actionData && "error" in actionData && (
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
                  Product registration failed
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
              New Product
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Model
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="family-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="image-url"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Image Url
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="text"
                    name="image-url"
                    type="image-url"
                    autoComplete="email"
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Color
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="color"
                    id="color"
                    autoComplete="street-address"
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Size
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="size"
                    id="size"
                    autoComplete="address-level2"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Price
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  {actionData && "inputValidationError" in actionData && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex justify-end">
          <Link
            to="/products"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
