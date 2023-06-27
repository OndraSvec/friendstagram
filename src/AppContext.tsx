import { ReactNode, createContext, useState } from "react";
import { auth } from "./firebase/setup";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  User,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AppContextProps =
  | "Default Value"
  | {
      user: User | null | undefined;
      error: null | string;
      loading: boolean;
      signInWithGoogle: () => void;
      signInWithFacebook: () => void;
      signUpWithPassword: (email: string, password: string) => void;
      signInWithPassword: (email: string, password: string) => void;
      signOut: () => void;
    };

const AppContext = createContext<AppContextProps>("Default Value");

interface AppContextProvProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProvProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
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

  const signInWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    setLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
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
      .then((result) => {
        setUser(result.user);
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

  const signInWithPassword = (email: string, password: string) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
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
        signInWithGoogle,
        signInWithFacebook,
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
