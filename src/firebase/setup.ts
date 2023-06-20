import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0wV86ayxrBVN_I4m_Lkyixqio2y4m41k",
  authDomain: "friendstagram-fe98d.firebaseapp.com",
  projectId: "friendstagram-fe98d",
  storageBucket: "friendstagram-fe98d.appspot.com",
  messagingSenderId: "585982801431",
  appId: "1:585982801431:web:86938549de3f760f734e52",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
