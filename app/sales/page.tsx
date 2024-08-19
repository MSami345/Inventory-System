"use client";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import useFetchData from "../_components/useFetchData";
import { message } from "antd";
import { ClientSales, Sales, SalesByClient } from "../_components/types";
import { AnyNaptrRecord } from "dns";
import { useRouter } from "next/navigation";

const Sale = () => {
  const router=useRouter()
  const { data, error, loading } = useFetchData<any>({
    endpoint: "sales",
  });

  const list: string[] = ["Product Name", "CLient Name", "Date", "Quantity", "Total Amount", "Actions"]

  const convertSalesByClient = (salesByClient: { [clientId: string]: { [saleId: string]: Sales } }): ClientSales[] => {
    return Object.entries(salesByClient).map(([clientId, sales]) => {
      const salesArray: Sales[] = Object.entries(sales).map(([saleId, saleData]) => ({
        ...saleData,
        saleId,
      }));

      return {
        clientId,
        sales: salesArray,
      };
    });
  };


  useEffect(() => {
    if (error) {
      message.error(error);
    }

    if (data.length != 0) {
    }
  }, [error, data]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Sales Details</h1>
        <Link href="/sales/new">
          <button className="p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
            Add New Sale +
          </button>
        </Link>
      </div>
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
              {data.map((client, index) => (
                <>
                  {Object.keys(client).map((key, index) => <>
                    {key !== "uid" &&
                      <tr
                        key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${client["uid"]}`}
                      >
                        <th scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >{client[key].product}</th>
                        <td className="px-6 py-4">{client[key].name}</td>
                        <td className="px-6 py-4">{client[key].date}</td>
                        <td className="px-6 py-4">{client[key].Items.quantity}</td>
                        <td className="px-6 py-4">{client[key].totalAmout}</td>
                        <td className="px-6 py-4 text-left">
                          <a 
                          // href={`/sales/${key}/${client["uid"]}`}
                            onClick={() => { router.push(`/sales/${key}/${client["uid"]}`) }}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                          </a>
                          <a href={`/sales/${client["uid"]}/${key}`}
                            className="px-4 font-medium text-red-600 dark:text-red-500 hover:underline">
                            Delete
                          </a>
                        </td>
                      </tr>}
                  </>)}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No Sales available</p>
      )}
    </div>
  );
};

export default Sale;
