
import AddClientForm from "@/app/_components/AddClientForm";
import React from "react";

const NewClient = () => {

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Client Form</h2>
      <AddClientForm />

    </div>
  );
};

export default NewClient;
