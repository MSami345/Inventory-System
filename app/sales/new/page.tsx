"use client";
import { db } from "@/app/lib/firebaseConfig";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { push, ref, set, update } from "firebase/database";
import { message } from "antd";
import { useRouter } from "next/navigation";
import useFetchData from "@/app/_components/useFetchData";

type Category = "mobile" | "laptop" | "tablet";

interface Product {
  productName: string;
  quantity: number;
  category: Category;
  companyName: string;
  price: number;
  uid: string;
}

interface Client {
  name: string;
  email: string;
  phone: string;
  uid: string;
}

type Item = { productId: string; quantity: number; price: number };
interface Sale {
  clientId: string;
  date: string;
  totalAmout: number;
  Items: Item;
}

const AddSale = () => {
  const {
    data,
    error,
    loading,
  }: { data: Product[]; error: string; loading: boolean } =
    useFetchData<Product>({
      endpoint: "products",
    });

  const {
    data: clientData,
    error: clientError,
    loading: clientLoading,
  }: { data: Client[]; error: string; loading: boolean } = useFetchData<Client>(
    {
      endpoint: "clients",
    }
  );

  useEffect(() => {
    if (error) {
      message.error(error);
    }

    if (clientError) {
      message.error(clientError);
    }
  }, [error, clientError]);

  const router = useRouter();
  const [maxQuantity, setMaxQuantiy] = useState<number>(0);
  const [formData, setFormData] = useState<Sale>({
    clientId: "",
    date: new Date().toISOString().split("T")[0],
    totalAmout: 0,
    Items: {
      productId: "",
      quantity: 0,
      price: 0,
    },
  });

  useEffect(() => {
    if (formData.Items.quantity > 0) {
      const totalAmount = formData.Items.price * formData.Items.quantity;
      setFormData({ ...formData, totalAmout: totalAmount });
    }
  }, [formData.Items.quantity, formData.Items.price, formData.Items.productId]);

  const inValid =
    !formData.clientId ||
    formData.totalAmout == 0 ||
    formData.Items.quantity == 0 ||
    !formData.Items.productId ||
    formData.Items.price <= 0;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    message.info(e.target.value);
    const product = data.find((item) => item.uid === e.target.value);
    product?.quantity && setMaxQuantiy(Number(product.quantity));
    setFormData({
      ...formData,
      Items: {
        ...formData.Items,
        productId: e.target.value,
        price: Number(product?.price),
      },
    });
  };

  const handleClientChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    message.info(e.target.value);
    setFormData({ ...formData, clientId: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { clientId, ...saleDetails } = formData;
    const product = data.find((item) => item.uid === formData.Items.productId);
    const client = clientData.find((item) => item.uid === formData.clientId);

    try {
      if (db == null) {
        message.error("Unable to connect with FireBase");
        return;
      }
      const saleRef = ref(db, `sales/${clientId}`);
      await set(push(saleRef), {
        ...saleDetails,
        name: client?.name,
        email: client?.email,
        product: product?.productName,
      });

      message.success("Sale added successfully");
      update(ref(db, `products/${formData.Items.productId}`), {
        quantity: maxQuantity - formData.Items.quantity,
      });

      router.push("/sales");
    } catch (error) {
      console.log(error);
      message.error("Error adding sale:");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Add New Sale
      </h2>
      {data.length == 0 || clientData.length == 0 ? (
        <>
          {loading || clientLoading ? (
            <h3 className="text-center text-gray-500">Loading...</h3>
          ) : (
            <>
              {data.length === 0 && (
                <h3 className="text-center text-gray-500">
                  No Products Available
                </h3>
              )}
              {clientData.length === 0 && (
                <h3 className="text-center text-gray-500">
                  No Clients Available
                </h3>
              )}
            </>
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="clientId"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Select Client
            </label>
            <select
              id="clientId"
              name="clientId"
              value={formData.clientId}
              onChange={handleClientChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Client</option>
              {clientData.map((client) => (
                <option key={client.uid} value={client.uid}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="productID"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Select Product
            </label>
            <select
              id="productID"
              name="productID"
              value={formData.Items.productId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Product</option>
              {data.map(
                (product) =>
                  product.quantity != 0 && (
                    <option key={product.uid} value={product.uid}>
                      {product.productName}
                    </option>
                  )
              )}
            </select>
          </div>

          <div className="mb-6">
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
              value={formData.Items.price}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  Items: { ...formData.Items, price: Number(e.target.value) },
                });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
                onClick={() => {
                  formData.Items.quantity > 0 &&
                    setFormData({
                      ...formData,
                      Items: {
                        ...formData.Items,
                        quantity: formData.Items.quantity - 1,
                      },
                    });
                }}
              >
                -
              </button>
              <p className="font-bold text-xl">{formData.Items.quantity}</p>
              <button
                type="button"
                className="py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
                onClick={() => {
                  formData.Items.quantity < maxQuantity &&
                    setFormData({
                      ...formData,
                      Items: {
                        ...formData.Items,
                        quantity: formData.Items.quantity + 1,
                      },
                    });
                }}
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Max Quantity Available: {maxQuantity}
          </p>

          <div className="flex items-end justify-between p-3 mb-6 rounded-lg bg-indigo-500 text-white">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-lg font-bold">{formData.totalAmout}</p>
          </div>

          <button
            type="submit"
            disabled={inValid}
            className={`w-full py-3 bg-indigo-600 ${
              !inValid ? "hover:bg-indigo-700" : "cursor-not-allowed"
            } text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all`}
          >
            Add Sale
          </button>
        </form>
      )}
    </div>
  );
};

export default AddSale;
