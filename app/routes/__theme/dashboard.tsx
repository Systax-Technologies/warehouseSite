import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Stats } from "~/components/Stats";

type ProductOverview = {
  status: string;
  total: number;
};

type LoaderData = {
  data: ProductOverview[];
};

export const loader: LoaderFunction = async ({}): Promise<LoaderData> => {
  // Default options are marked with *
  // const response = await fetch('http://api/v1/warehouse/products/count/by-status/', {

  //     method: 'get',
  //     headers: {
  //       'Authorization': `Bearer ${jwt}` ,
  //     }

  //   }}}

  const jsonString: ProductOverview[] = [
    {
      status: "In Stock",
      total: 218,
    },
    {
      status: "Active",
      total: 218,
    },
    {
      status: "Damaged",
      total: 218,
    },
    {
      status: "Sold",
      total: 218,
    },
  ];

  return { data: jsonString };
};

export default function Dashboard() {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <Stats>
        {loaderData.data.map((item) => (
          <Stats.Item key={item.status}>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.status}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.total}
            </dd>
          </Stats.Item>
        ))}
      </Stats>
    </div>
  );
}
