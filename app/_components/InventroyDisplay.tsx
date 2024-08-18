"use client";
import React, { useEffect } from "react";
import useFetchData from "./useFetchData";
import { Product } from "./types";
import { message } from "antd";

const InventroyDisplay = () => {
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
      //   console.log(data);
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
        <div>
          <div className="grid grid-cols-6 gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
            {list.map((item) => (
              <p className="font-semibold text-gray-700">{item}</p>
            ))}
          </div>
          {data.map((product) => (
            <div
              key={product.uid}
              className="grid grid-cols-6 items-center gap-4 mb-4 p-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-black">{product.productName}</p>
              <p className="text-gray-600">{product.companyName}</p>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-gray-600">{product.quantity}</p>
              <p className="text-gray-600">{product.price}</p>
              <button
                className="justify-self-start bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  message.info(`Deleting the product with id: ${product.uid}`);
                  // handleDelete(product.uid); // Uncomment this when implementing the delete function
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available</p>
      )}
    </>
  );
};

export default InventroyDisplay;
