import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {};

export const laoder: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  return {};
};

export default function Dashboard() {
  const loaderData = useLoaderData<LoaderData>();

  return <>Lorem ipsum</>;
}
