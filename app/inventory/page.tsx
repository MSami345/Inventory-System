"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import useFetchData from "../_components/useFetchData";
import { message } from "antd";

type Category = "mobile" | "laptop" | "tablet";
interface Product {
  productName: string;
  quantity: number;
  category: Category;
  companyName: string;
  price: number;
  uid: string;
}

const Inventory = () => {
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
      console.log(data);
    }
  }, [error, data]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Inventory Details
        </h1>
        <Link href="/inventory/new">
          <button className="p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
            Add New Product +
          </button>
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : data.length !== 0 ? (
        <div>
          <div className="grid grid-cols-6 gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700">Product Name</p>
            <p className="font-semibold text-gray-700">Company</p>
            <p className="font-semibold text-gray-700">Category</p>
            <p className="font-semibold text-gray-700">Quantity</p>
            <p className="font-semibold text-gray-700">Price</p>
            <p className="font-semibold text-gray-700">Actions</p>
          </div>
          {data.map((product) => (
            <div
              key={product.uid}
              className="grid grid-cols-6 items-center gap-4 mb-4 p-2 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-900">{product.productName}</p>
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
    </div>
  );
};

export default Inventory;
