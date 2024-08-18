"use client";
import { db } from "@/app/_lib/firebaseConfig";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { push, ref, set } from "firebase/database";
import { message } from "antd";
import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

type Category = "mobile" | "laptop" | "tablet";

interface Product {
  productName: string;
  quantity: number;
  category: Category;
  companyName: string;
  price: number;
}

const AddInventory = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    productName: "",
    quantity: 0,
    category: "mobile",
    companyName: "",
    price: 0,
  });

  const inValid =
    !formData.quantity ||
    formData.quantity <= 0 ||
    !formData.productName ||
    !formData.companyName ||
    formData.price <= 0;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (db == null) {
        message.error("Unable to connect with FireBase");
        return;
      }
      const productRef = ref(db, "products");
      await set(push(productRef), formData);

      message.success("Product added successfully");
      router.push("/inventory");
    } catch (error) {
      console.log(error);
      message.error("Error adding product:");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Inventory Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) => {
              handleChange(e);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>

        <button
          type="submit"
          disabled={inValid}
          className={`w-full py-2 bg-blue-500 ${
            !inValid ? "hover:bg-blue-600" : "cursor-not-allowed"
          } text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
