'use client'
import { message } from 'antd';
import React, { FormEvent, useEffect, useState } from 'react'
import { db } from '../_lib/firebaseConfig';
import { onValue, push, ref, set, update } from 'firebase/database';
import { useParams, useRouter } from 'next/navigation';
import InventoryForm from './InventoryForm';
import { Product } from './types';


const EditInventoryForm = () => {
    const [data, setData] = useState<Product>({ companyName: '', productName: '', price: 0, quantity: 0, category: 'mobile', uid: '' });
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams()
    useEffect(() => {
        try {
            setLoading(true);
            if (db == null) {
                message.error("Unable to connect with FireBase");
                setLoading(false);
                setLoading(true)
                return;
            }
            const dbRef = ref(db, `products/${id}`);
            onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log(data);
                    setData(data);
                } else {
                    setError(true)
                    message.error("UBal data Avaiable");
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
    const router = useRouter()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: Product) => {
        e.preventDefault();

        try {
            if (db == null) {
                message.error("Unable to connect with FireBase");
                return;
            }
            const productRef = ref(db, `products/${id}`);
            // console.log(formData)
            await update(productRef, formData)

            message.success("Product updated successfully");
            router.push("/inventory");
        } catch (error) {
            // console.log(error);
            message.error(`Error updating product`);
        }
    };
    return (
        <>
            {loading ? <p>Loading data ...</p> : <>
                {error ? <p>Error Loading Product Details</p> :
                    <InventoryForm submitLabel='Upadte' initialData={data} handleSubmit={handleSubmit} />}
            </>}

        </>
    )
}

export default EditInventoryForm