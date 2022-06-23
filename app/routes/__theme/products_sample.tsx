/* This example requires Tailwind CSS v2.0+ */
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { List } from "~/components/List";
import { Table } from "~/components/Table";

type LoaderData = {
  products: ListableProduct[];
};

type Product = {
  id: string;
  status: string;
  orderId: string | null;
  productTypeId: string;
  activeProduct: {
    id: string;
    status: string;
    customerId: string;
  } | null;
};

type ListableProduct = {
  id: string;
  status: string;
  model: string;
  description: string;
  size: string;
  color: string;
};
export const loader: LoaderFunction = async ({}): Promise<LoaderData> => {
  const productJson: Product[] = [
    {
      id: "string",
      status: "string",
      orderId: "string",
      productTypeId: "string",
      activeProduct: {
        id: "string",
        status: "string",
        customerId: "string",
      },
    },
    {
      id: "string",
      status: "string",
      orderId: "string",
      productTypeId: "string",
      activeProduct: {
        id: "string",
        status: "string",
        customerId: "string",
      },
    },
    {
      id: "string",
      status: "string",
      orderId: "string",
      productTypeId: "string",
      activeProduct: {
        id: "string",
        status: "string",
        customerId: "string",
      },
    },
  ];

  return {
    products: [],
  };
};

// const getProductStatus = (product: Product) => {
//   return (product.status == "SOLD" && product.activeProduct.status == "REMOVED" ?
//     "Removed" : product.status == "SOLD" && product.activeProduct.status == "DAMAGED" ?
//       "Damaged" : product.status == "SOLD" && product.activeProduct.status == "ACTIVE" ?
//         "Active" : product.status == "IN_STOCK" ?
//           "In Stock" : product.status == "SOLD" ?
//             "Sold" : "-")
// }

// const ElaboratedData = ({ productsList, productTypeList }: ElaboratedDataProps) => {
//   let listableProducts: ListableProduct[] = []
//   productsList.map(product => {
//     const status = getProductStatus(product)
//     listableProducts.push({
//       "id": product.id,
//       "status": getProductStatus(product),
//       "productType": productTypeList[productsList.indexOf(product)]
//     })
//   })
//   return (listableProducts)
// }

export default function ProductsList() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <>
      <Table>
        <Table.Header
          headers={["id", "model", "description", "size", "color", "status"]}
        />
        <Table.Body></Table.Body>
      </Table>
    </>
  );
}
