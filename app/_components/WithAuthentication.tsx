import { onAuthStateChanged, User } from "firebase/auth";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import SessionContext from "./AuthContext";
import { auth } from "../_lib/firebaseConfig";
// import FirebaseContext from "../Firebase";

interface WithAuthentiactionProps {
  children: ReactNode;
}
const WithAuthentication = ({ children }: WithAuthentiactionProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  //   const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    // console.log(auth);
    //   auth?.currentUser && console.log(auth?.currentUser?.emailVerified);
    if (auth == null) {
      setAuthUser(null);
      return;
    }
    const authenticate = onAuthStateChanged(auth, (user) =>
      user ? setAuthUser(user) : setAuthUser(null)
    );
    return () => authenticate();
  }, [auth]);

  return (
    <>
      <SessionContext.Provider value={{ authUser, auth }}>
        {children}
      </SessionContext.Provider>
    </>
  );
};

export default WithAuthentication;
