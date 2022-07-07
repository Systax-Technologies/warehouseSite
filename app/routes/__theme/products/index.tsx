import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { BackendError } from "~/components/BackendError";
import { Breadcrumb } from "~/components/Breadcrumb";

type Product = {
  id: string;
  model: string;
  imageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type LoaderDataOnError = {
  error: true;
};

type LoaderData =
  | {
      products: Product[];
    }
  | LoaderDataOnError;

export const loader: LoaderFunction = async ({}): Promise<LoaderData> => {
  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/warehouse/products",
    {
      method: "get",
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

  const { products } = loaderData;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb></Breadcrumb>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Product</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all product types in the warehouse
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/products/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
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
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Instances</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.model}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.price}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/products/${product.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/products/${product.id}/instances`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Instances
                        </Link>
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Form method="post">
                          <button
                            type="submit"
                            name="delete-employee"
                            value={product.id}
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
