"use client";
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebaseConfig";
import { onValue, ref } from "firebase/database";

const useFetchData = <T,>({
  endpoint,
}: {
  endpoint: string;
}): { data: T[]; error: string; loading: boolean } => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setLoading(true);
      if (db == null) {
        setError("Unable to connect with FireBase");
        setLoading(false);
        return;
      }
      const dbRef = ref(db, endpoint);
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // console.log(users);
          const dataList = Object.keys(data).map((key) => ({
            ...data[key],
            uid: key,
          }));
          // console.log(UsersList);
          setData(dataList);
        } else {
          setData([]);
          setError("No data Avaiable");
        }
      });
    } catch (error) {
      setError((error as Error)?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [endpoint]);
  return {
    data,
    error,
    loading,
  };
};

export default useFetchData;
