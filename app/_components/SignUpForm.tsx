'use client'
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Auth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { ref, set } from "firebase/database";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SessionContext from "./AuthContext";
import { db } from "../_lib/firebaseConfig";

type FormData = {
    userName: string;
    email: string;
    password: string;
    password2: string;
};

const SignUp = (): JSX.Element => {
    const router = useRouter();
    const { auth }: { auth: Auth | null } = useContext(SessionContext);
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        password: "",
        password2: "",
    });

    const inValid: boolean =
        !formData.userName ||
        !formData.email ||
        !formData.password ||
        !formData.password2 ||
        formData.password !== formData.password2;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { userName, email, password, password2 } = formData;

        if (!userName || !email || !password || !password2) {
            message.error("Fields can't be empty");
            return;
        }

        if (password !== password2) {
            message.error("Passwords do not match!");
            return;
        }
        if (auth == null || db == null) {
            return message.error("Error connecting with Firebase");
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            await set(ref(db, `users/${uid}`), {
                userName,
                email,
            });
            message.success("Account Created Successfully");
            router.push("/");
        } catch (error) {
            message.error(`Sign-up error: ${(error as Error).message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${inValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={inValid}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm">
                        Already have an account? <Link href="/SignIn" className="text-primary hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
