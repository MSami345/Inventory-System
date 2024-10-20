'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import useFetchData from './useFetchData';
import { message } from 'antd';

const SalesDisplay = () => {
    const router = useRouter()
    const { data, error, loading } = useFetchData<any>({
        endpoint: "sales",
    });

    const list: string[] = ["Product Name", "CLient Name", "Date", "Quantity", "Total Amount", "Actions"]

    useEffect(() => {
        if (error) {
            message.error(error);
        }

        if (data.length != 0) {
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
                                                        // href={`/sales/888/999`}
                                                        onClick={() => { router.push(`/sales/${client["uid"]}/${key}`) }}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
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
            )}</>
    )
}

export default SalesDisplay