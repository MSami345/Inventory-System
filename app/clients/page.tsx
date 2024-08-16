"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import useFetchData from "../_components/useFetchData";
import { message } from "antd";
import { useRouter } from "next/navigation";
interface Client {
  name: string;
  email: string;
  phone: string;
  uid: string;
}

const Client = () => {
  const router = useRouter();
  const {
    data,
    error,
    loading,
  }: { data: Client[]; error: string; loading: boolean } = useFetchData<Client>(
    {
      endpoint: "clients",
    }
  );

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
          Clients Details
        </h1>
        <Link href="/clients/new">
          <button className="w-full p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
            Add New Client +
          </button>
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : data.length !== 0 ? (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700">Client Name</p>
            <p className="font-semibold text-gray-700 truncate">Email</p>
            <p className="font-semibold text-gray-700">Phone Number</p>
            <p className="font-semibold text-gray-700">Actions</p>
          </div>
          {data.map((client) => (
            <div
              key={client.uid}
              className="grid grid-cols-4 items-center gap-4 mb-4 p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-900">{client.name}</p>
              <p className="text-gray-600">{client.email}</p>
              <p className="text-gray-600">{client.phone}</p>

              <button
                className="justify-self-start  bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  message.info(`Deleting the client with id: ${client.uid}`);
                  // router.push(`/sale/new/ ${client.uid}`);
                  // handleDelete(client.uid); // Uncomment this when implementing the delete function
                }}
              >
                Show sales {">"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No clients available</p>
      )}
    </div>
  );
};

export default Client;
