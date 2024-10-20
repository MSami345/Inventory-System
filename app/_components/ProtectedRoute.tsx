
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "./AuthContext";
import { Auth, User } from "firebase/auth";
import { message } from "antd";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authUser, auth }: { authUser: User | null, auth: Auth | null } = useContext(SessionContext);
    const router = useRouter();

    useEffect(() => {

        if (auth == null) {
            message.info("firebase not connected")
        }
        if (authUser === null) {
            message.error("SignIn again")
            router.push("/SignIn");
        }
    }, [authUser, router]);

    // Render the protected content if the user is authenticated
    return authUser ? <>{children}</> : null;
};

export default ProtectedRoute;
