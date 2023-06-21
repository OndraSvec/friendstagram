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

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  const signInWithFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  const signUpWithPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  const signInWithPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  const signOut = () => {
    auth.signOut();
    setUser(null);
  };
  return (
    <AppContext.Provider
      value={{
        user,
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
