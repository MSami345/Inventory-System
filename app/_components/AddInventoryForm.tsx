'use client'
import { message } from 'antd';
import React, { FormEvent } from 'react'
import { db } from '../_lib/firebaseConfig';
import { push, ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import InventoryForm from './InventoryForm';
type Category = "mobile" | "laptop" | "tablet";
interface Product {
    productName: string;
    quantity: number;
    category: Category;
    companyName: string;
    price: number;
}

const AddInventoryForm = () => {
    const router = useRouter()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>, formData: Product) => {
        e.preventDefault();

        try {
            if (db == null) {
                message.error("Unable to connect with FireBase");
                return;
            }
            const productRef = ref(db, "products");
            console.log(formData)
            await set(push(productRef), formData);

            message.success("Product added successfully");
            router.push("/inventory");
        } catch (error) {
            console.log(error);
            message.error("Error adding product:");
        }
    };
    return (
        <>
            <InventoryForm submitLabel='Add' handleSubmit={handleSubmit} />
        </>
    )
}

export default AddInventoryForm