
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "./AuthContext";
import { User } from "firebase/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authUser }: { authUser: User | null } = useContext(SessionContext);
    const router = useRouter();

    useEffect(() => {
        if (!authUser) {
            router.push("/SignIn");
        }
    }, [authUser, router]);

    // Render the protected content if the user is authenticated
    return authUser ? <>{children}</> : null;
};

export default ProtectedRoute;
