import React from "react";
import InventroyDisplay from "../_components/InventroyDisplay";
import Button from "../_components/Button";

const Inventory = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Inventory Details
        </h1>
        <Button btnText="Add new product +" btnLink="/inventory/new" />
      </div>
      <InventroyDisplay />
    </div>
  );
};

export default Inventory;
