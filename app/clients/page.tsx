import React from "react";
import Button from "../_components/Button";
import ClientsDisplay from "../_components/ClientsDisplay";

const Client = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 text-gray-800">
          Clients Details
        </h1>
        <Button
          btnText="Add New Client +"
          btnLink="/clients/new"
          classes="w-full md:w-auto text-center"
        />
      </div>
      <ClientsDisplay />
    </div>
  );
};

export default Client;
