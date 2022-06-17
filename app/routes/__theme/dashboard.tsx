import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
export const laoder: LoaderFunction = async ({
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

    <div className="flex bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {productsOverviewList.map(element => (
        <>
          <h1>{element.status}</h1>
          <p>{element.status}</p>
        </>
      ))}
    </div>
  );
}


export default function Dashboard() {
  const loaderData = useLoaderData<LoaderData>();
  return (<div className="bg-white p-2">
    <List productsOverviewList={loaderData.data} />
  </div>
  );
}
