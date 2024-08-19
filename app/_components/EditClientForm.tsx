"use client";
import { message } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { db } from "../_lib/firebaseConfig";
import { Client } from "./types";
import { onValue, push, ref, set, update } from "firebase/database";
import { useParams, useRouter } from "next/navigation";
import ClientForm from "./ClientForm";

const EditClientForm = () => {
  const router = useRouter()

  const [data, setData] = useState<Client>({ name: '', email: '', phone: '', uid: '' });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams()
  useEffect(() => {
    try {
      setLoading(true);
      if (db == null) {
        message.error("Unable to connect with FireBase");
        setLoading(false);
        return;
      }
      const dbRef = ref(db, `clients/${id}`);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setData(data);
        } else {
          setError(true)
          message.error("No data Avaiable");
        }
      });
    } catch (error) {
      setError(true);
      message.error((error as Error)?.message)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [id])


  const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: Omit<Client, "uid">) => {
    e.preventDefault();
    try {
      if (db == null) {
        message.error("Unable to connect with FireBase");
        return;
      }
      const clientRef = ref(db, `clients/${id}`);
      await update(clientRef, formData);

      message.success("Client updated successfully");
      router.push("/clients");
    } catch (error) {
      message.error("Error updating client");
    }
  };

  return (
    <>
      {loading ? <p>Loading data ...</p> : <>
        {error ? <p>Error Loading Product Details</p> :
          <ClientForm submitLabel="Update" handleSubmit={handleSubmit} initialData={data} />}</>}
    </>)
};

export default EditClientForm;
