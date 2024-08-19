import { useContext } from "react";
import { Auth, signOut } from "firebase/auth";
import { message } from "antd";
import SessionContext from "./AuthContext";
import { useRouter } from "next/navigation";

const SignOut = (): JSX.Element => {
    const router = useRouter();
    const { auth }: { auth: Auth | null } = useContext(SessionContext);
    return (
        <>
            <button
                className="px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => {
                    if (auth == null)
                        return message.error("Unable to connect to database");
                    signOut(auth)
                        .then(() => {
                            message.success("Signed Out Successfully");
                            router.push("/");
                        })
                        .catch((error) => message.error("Failed !", error?.message));
                }}
            >
                Logout
            </button>
        </>
    );
};

export default SignOut;
