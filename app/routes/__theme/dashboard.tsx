import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { ApiClient } from "jwt-rest-api-client";

type ProductOverview = {
  status: string,
  total: number;
};

type LoaderData = {
  data: ProductOverview[]
};

// const instance = new ApiClient({
//   baseURL: "http://api/v1/",
// });
// instance
//   .get('warehouse/products/count/by-status?')
//   .then(function (response){
//     console.log(response)
//   })

//var productOverviewList: ProductOverview [] = JSON.parse(jsonString)
export const loader: LoaderFunction = async ({
}): Promise<LoaderData> => {

  

  // Default options are marked with *
  // const response = await fetch('http://api/v1/warehouse/products/count/by-status/', {

  //     method: 'get', 
  //     headers: {
  //       'Authorization': `Bearer ${jwt}` ,
  //     }

  //   }}}

  const jsonString: ProductOverview[] = [
    {
      "status": "In Stock",
      "total": 218
    },
    {
      "status": "Active",
      "total": 218
    },
    {
      "status": "Damaged",
      "total": 218,
    },
    {
      "status": "Sold",
      "total": 218
    }
  ];

  return { data: jsonString }
};



export default function Dashboard() {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <>
      <div className="max-w-7xl">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <Stats stats={loaderData.data} />
      {console.log()}
    </>
  );
}

type StatsProps = {
  stats: ProductOverview[]
}

function Stats({ stats }: StatsProps) {
  return (
    <div>
      <dl className="py-4 grid grid-cols-1 gap-5 sm:grid-cols-4">
        {stats.map((item) => (
          <div key={item.status} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.status}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.total}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
