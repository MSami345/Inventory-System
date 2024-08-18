"use client";
import { message } from "antd";
import React, { FormEvent } from "react";
import { db } from "../_lib/firebaseConfig";
import { Client } from "./types";
import { push, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import ClientForm from "./ClientForm";

const AddClientForm = () => {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: Omit<Client, "uid">) => {
    e.preventDefault();
    try {
      if (db == null) {
        message.error("Unable to connect with FireBase");
        return;
      }
      const clientRef = ref(db, "clients");
      await set(push(clientRef), formData);

      message.success("Client added successfully");
      router.push("/clients");
    } catch (error) {
      // console.log(error);
      message.error("Error adding client");
    }
  };

  return <ClientForm submitLabel="Add" handleSubmit={handleSubmit} />
};

export default AddClientForm;
