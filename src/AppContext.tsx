import { ReactNode, createContext, useState } from "react";
import { auth } from "./firebase/setup";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { addUserToFirestore, getUser } from "./firebase/functions";

type AppContextProps = {
  user: User | null | undefined;
  error: null | string;
  notification: null | string;
  loading: boolean;
  signInWithGoogle: () => void;
  signUpWithPassword: (email: string, password: string) => void;
  signInWithPassword: (email: string, password: string) => void;
  signOut: () => void;
};

const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppContextProvProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProvProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [error, setError] = useState<null | string>(null);
  const [notification, setNotification] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        setUser(result.user);
        if (!(await getUser(result.user.uid))) addUserToFirestore(result.user);
        setError(null);
      })
      .catch((error) => {
        const errorMsg = error.message
          .split("auth/")[1]
          .split(")")[0]
          .replace(/-/g, " ");
        const capitalizedErrMsg =
          errorMsg.slice(0, 1).toUpperCase() + errorMsg.slice(1);
        setError(capitalizedErrMsg);
      })
      .finally(() => setLoading(false));
  };

  const signUpWithPassword = (email: string, password: string) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        if (result.user) {
          sendEmailVerification(result.user);
          setError(null);
          setNotification("Check your email to verify your account.");
        }
      })
      .catch((error) => {
        const errorMsg = error.message
          .split("auth/")[1]
          .split(")")[0]
          .replace(/-/g, " ");
        const capitalizedErrMsg =
          errorMsg.slice(0, 1).toUpperCase() + errorMsg.slice(1);
        setError(capitalizedErrMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithPassword = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        setUser(result.user);
        if (!(await getUser(result.user.uid))) addUserToFirestore(result.user);
        setError(null);
      })
      .catch((error) => {
        const errorMsg = error.message
          .split("auth/")[1]
          .split(")")[0]
          .replace(/-/g, " ");
        const capitalizedErrMsg =
          errorMsg.slice(0, 1).toUpperCase() + errorMsg.slice(1);
        setError(capitalizedErrMsg);
      })
      .finally(() => {
        setLoading(false);
        setNotification(null);
      });
  };

  const signOut = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        error,
        notification,
        signInWithGoogle,
        signUpWithPassword,
        signInWithPassword,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
