"use client";
import React, { useEffect } from "react";
import useFetchData from "./useFetchData";
import { Product } from "./types";
import { message } from "antd";
import { useRouter } from "next/navigation";

const InventroyDisplay = () => {

  const router = useRouter()
  const {
    data,
    error,
    loading,
  }: { data: Product[]; error: string; loading: boolean } =
    useFetchData<Product>({
      endpoint: "products",
    });

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    if (data.length !== 0) {
    }
  }, [error, data]);

  const list: string[] = [
    "Product Name",
    "Company",
    "Category",
    "Quantity",
    "Price",
    "Actions",
  ];
  return (
    <>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : data.length !== 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {list.map((item, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr
                  key={product.uid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.productName}
                  </th>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.companyName}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/inventory/${product.uid}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"

                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available</p>
      )}
    </>
  );
};

export default InventroyDisplay;
