import Link from "next/link";
import React from "react";
import SalesDisplay from "../_components/SalesDisplay";
import ProtectedRoute from "../_components/ProtectedRoute";
import Button from "../_components/Button";

const Sale = () => {

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Sales Details</h1>
          <Button btnLink="/sales/new" btnText="Add New Sale +" classes="w-full md:w-auto text-center" />
        </div>
        <SalesDisplay />
      </div>
    </ProtectedRoute>
  );
};

export default Sale;
