import { Auth, User } from "firebase/auth";
import { createContext } from "react";

interface SessionContextType {
  authUser: User | null;
  auth: null | Auth
}
const SessionContext = createContext<SessionContextType>({ authUser: null, auth: null });

export default SessionContext;