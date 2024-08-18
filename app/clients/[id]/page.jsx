import EditClinetForm from "../../_components/EditClientForm";
import React from "react";

const EditClient = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Update Client Form
      </h2>
      <EditClinetForm />
    </div>
  );
};

export default EditClient;
