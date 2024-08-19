"use client";
import React, { useEffect } from "react";
import { Client } from "./types";
import useFetchData from "./useFetchData";
import { message } from "antd";
import { useRouter } from "next/navigation";
import useDeleteData from "./useDeleteData";

const ClientsDisplay = () => {
  const router = useRouter()
  const { deleteData, deleteLoad } = useDeleteData();
  const list: string[] = ["Client Name", "Email", "Phone Number ", "Actions"];
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
      // console.log(data);
    }
  }, [error, data]);
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
              {data.map((client) => (
                <tr
                  key={client.uid}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {client.name}
                  </th>
                  <td className="px-6 py-4">{client.email}</td>
                  <td className="px-6 py-4">{client.phone}</td>
                  <td className="px-8 py-4-left">
                    <a
                      href={`/clients/${client.uid}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>

                    <a
                      // href={`/clients/${client.uid}`}
                      onClick={() => {
                        deleteData(`/clients/${client.uid}`)
                      }}
                      className="px-4 font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // <div>
        //   <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
        //     <p className="font-semibold text-gray-700">Client Name</p>
        //     <p className="font-semibold text-gray-700 truncate">Email</p>
        //     <p className="font-semibold text-gray-700">Phone Number</p>
        //     <p className="font-semibold text-gray-700">Actions</p>
        //   </div>
        //   {data.map((client) => (
        //     <div
        //       key={client.uid}
        //       className="grid grid-cols-4 items-center gap-4 mb-4 p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        //     >
        //       <p className="text-gray-900">{client.name}</p>
        //       <p className="text-gray-600">{client.email}</p>
        //       <p className="text-gray-600">{client.phone}</p>

        //       <button
        //         className="justify-self-start  bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
        //         onClick={() => {
        //           message.info(`Deleting the client with id: ${client.uid}`);
        //           // router.push(`/sale/new/ ${client.uid}`);
        //           // handleDelete(client.uid); // Uncomment this when implementing the delete function
        //         }}
        //       >
        //         Show sales {">"}
        //       </button>
        //     </div>
        //   ))}
        // </div>
        <p className="text-center text-gray-600">No clients available</p>
      )}
    </>
  );
};

export default ClientsDisplay;
