'use client'
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { message } from "antd";
import SessionContext from "./AuthContext";

interface FormDataType {
    email: string;
    password: string;
}

const SignInForm = (): JSX.Element => {
    const { auth } = useContext(SessionContext);
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const inValid = !formData.email || !formData.password;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            message.error("Fields can't be empty");
            return;
        }

        try {
            if (auth == null) return message.error("Unable to connect to FireBase");
            await signInWithEmailAndPassword(auth, email, password);
            message.success("Signed In Successfully");
            router.push("/");
        } catch (error) {
            message.error(`Sign-in error: ${(error as Error).message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/password-forget" className="text-sm text-primary hover:underline">Forgot password?</Link>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${inValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={inValid}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <hr className="my-6" />
                    <p className="text-sm">
                        Don't have an account? <Link href="/sign-up" className="text-primary hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
