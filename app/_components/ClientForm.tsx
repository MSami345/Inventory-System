"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

interface Client {
    name: string;
    email: string;
    phone: string;
}

interface ClientFormProps {
    initialData?: Client;
    handleSubmit: (e: FormEvent<HTMLFormElement>, data: Client) => Promise<void>;
    submitLabel: string;
}

const ClientForm: React.FC<ClientFormProps> = ({
    initialData,
    handleSubmit,
    submitLabel,
}) => {
    const [formData, setFormData] = useState<Client>(
        initialData || {
            name: "",
            email: "",
            phone: "",
        }
    );

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const inValid =
        !formData.email || !formData.name || formData.phone.length !== 11;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <form onSubmit={(e) => handleSubmit(e, formData)}>
            <div className="mb-4">
                <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="phone"
                    className="block text-gray-700 text-sm font-medium mb-2"
                >
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                        e.target.value.length <= 11 && handleChange(e);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
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

export default ClientForm;
