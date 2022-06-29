import { Component, ReactNode } from 'react';
import Products from '~/routes/__theme/products';

type ListableProduct = {
    id: string,
    status: string,
    productType: {
        model: string;
        description: string;
        size: string;
        color: string;
    };
}

type Products = {
    productsList: ListableProduct[],
}

type ListableActiveProduct = {
    id: string,
    status: string,
    customerId: string
}

type ActiveProducts = {
    activeproductsList: ListableActiveProduct[],
}

type ListProps = {
    products: Products | ActiveProducts,
    productTypeList: string[],
}

const listP: ListableProduct[] = [
    {
        "id": "string",
        "status": "string",
        "productType": "string"
    },
    {
        "id": "string",
        "status": "string",
        "productType": "string",
    },
    {
        "id": "string",
        "status": "string",
        "productType": "string",
    },
    {
        "id": "string",
        "status": "string",
        "productType": "string",
    },
    {
        "id": "string",
        "status": "SOLD",
        "productType": "string",
    }


]

const tableHeaders = (listableProduct: ListableProduct | ListableActiveProduct) => {
    for (const key in listableProduct) {
        return (
            <tr>
                <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">
                    {key}
                </th>
            </tr>
        )
    }
}
const tableContent = (listableProducts: Products | ListableActiveProduct) => {
    if ("productsList" in listableProducts) {
        listableProducts.productsList.map(product => {
            for(const key in product){

                product[key]
            }
            return (
                <tr key={product.}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                        {product.id}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                        {product.productType}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {product.status}
                    </td>
                </tr>
            )
        })


    }}
}

const productTable = (listableProducts: Products | ActiveProducts) => {
    if ("productsList" in listableProducts) {
        let tableContent;
        listableProducts.productsList.map(product => {

        })
        return (
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    {tableHeaders(listableProducts.productsList[0])}
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {tableContent()}
                </tbody>
            </table>
        )
    }
}


listP.forEach(element => {
    const numberOfProperties = Object.keys(element).length
});
export function List({ products, productTypeList }: ListProps) {
    if ("productsList" in products) {
        return (
            <div className=" border-slate-900  px-4 sm:px-6 lg:px-8 flex flex-col justify-center align-middle w-auto h-auto">
                <div className="sm:flex items-center row-auto">
                    <div className="sm:flex-auto">
                        <div className="max-w-7xl">
                            <h1 className="text-2xl font-semibold text-gray-900">{ }</h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all products, that also consider their status.
                        </p>
                    </div>
                </div>
                <div className=" flex-auto flex-row justify-items-end">
                    <div>
                        {/*here we are going to implement product filters and dropdown to filter products for status */}
                    </div>
                    <div className="mx-0 flex justify-end">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Add product
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            {listOfHeaders()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className=" border-slate-900  px-4 sm:px-6 lg:px-8 flex flex-col justify-center align-middle w-auto h-auto">
            <div className="sm:flex items-center row-auto">
                <div className="sm:flex-auto">
                    <div className="max-w-7xl">
                        <h1 className="text-2xl font-semibold text-gray-900">{ }</h1>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all products, that also consider their status.
                    </p>
                </div>
            </div>
            <div className=" flex-auto flex-row justify-items-end">
                <div>
                    {/*here we are going to implement product filters and dropdown to filter products for status */}
                </div>
                <div className="mx-0 flex justify-end">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add product
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                    >
                                        Id
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Tipo
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ListableProductsList.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                            {product.id}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                                            {product.productType}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{product.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
