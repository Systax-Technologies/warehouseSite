import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import React from "react";
import { z } from "zod";
import { database } from "~/helpers/db-helper.server";

type ProductOverview = {
  status: string,
  total: number;
};

type LoaderData = {
  data: ProductOverview[]
};



//var productOverviewList: ProductOverview [] = JSON.parse(jsonString)
export const loader: LoaderFunction = async ({
}): Promise<LoaderData> => {

  const jsonString = [
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

return {data: jsonString}
};

type ListProps = {
  productsOverviewList: ProductOverview[]
}

function List({ productsOverviewList }: ListProps) {
  return (

    <div className="pl-32  grid grid-cols-4 gap-4 justify-items-auto h-max w-max py-32 justify-items-auto">
      {productsOverviewList.map(element => (
        <div className="bg-white h-64 w-64 py-8 px-2 shadow sm:rounded-lg sm:px-10">
          <h1>{element.status}</h1> 
          <br/>
          <p>{element.total}</p>
        </div>
      ))}
    </div>
  );
}

/*<div className="flex">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Products Dashboard</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3>
        {productsOverviewList.map((element) => (
          <div className="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6" >
            <dt className="text-sm font-medium text-gray-500 truncate">{element.status}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{element.total}</dd>
          </div>
        ))}
      </dl>
    </div>*/

export default function Dashboard() {
  const loaderData = useLoaderData<LoaderData>();
  return (<div className="h-screen max-w bg-gradient-to-b from-gray-100 to-blue-100 px-0 py-0">
    <List productsOverviewList={loaderData.data} />
  </div>
  );
}
