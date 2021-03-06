import { Breadcrumb } from "~/components/Breadcrumb";

export default function activeProducts() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Breadcrumb></Breadcrumb>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Active Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all active products in the warehouse
          </p>
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Customer Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
