import React from "react";
import AddInventoryForm from "@/app/_components/AddInventoryForm";
import ProtectedRoute from "@/app/_components/ProtectedRoute";


const AddInventory = () => {

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Inventory Form</h2>
        <AddInventoryForm />
      </div>
    </ProtectedRoute>
  );
};

export default AddInventory;
