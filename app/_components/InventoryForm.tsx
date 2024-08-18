"use client";

import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";

type Category = "mobile" | "laptop" | "tablet";

interface Product {
    productName: string;
    quantity: number;
    category: Category;
    companyName: string;
    price: number;
    uid?: string
}

interface InventoryFormProps {
    initialData?: Product;
    handleSubmit: (e: FormEvent<HTMLFormElement>, data: Product) => Promise<void>;
    submitLabel: string;
}

const InventoryForm = ({
    initialData,
    handleSubmit,
    submitLabel,
}: InventoryFormProps) => {
    const [formData, setFormData] = useState<Product>(
        initialData || {
            productName: "",
            quantity: 0,
            category: "mobile",
            companyName: "",
            price: 0,
        }
    );

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const inValid =
        !formData.quantity ||
        formData.quantity <= 0 ||
        !formData.productName ||
        !formData.companyName ||
        formData.price <= 0;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "price" ? Number(value) : value,
        });
    };


    return (
        <form onSubmit={(e) => handleSubmit(e, formData)}>
            <div className="mb-4">
                <label
                    htmlFor="productName"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Product Name
                </label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="companyName"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Company Name
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter company name"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="quantity"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quantity"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="category"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="mobile">Mobile</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                </select>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={inValid}
                className={`w-full py-2 bg-blue-500 ${!inValid ? "hover:bg-blue-600" : "cursor-not-allowed"
                    } text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default InventoryForm;
