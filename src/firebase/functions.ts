import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { storage, db } from "./setup";
import { useEffect, useState } from "react";

const addFileToStorage = async (
  file: File,
  progressFunc: (percentage: number) => void,
  errorFunc: (capitalizedErrMsg: string | null) => void,
  urlFunc: (url: string) => void
) => {
  const storageRef = ref(storage, file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snap) => {
      const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      progressFunc(percentage);
    },
    (error) => {
      const errorMsg = error.message.split("storage/")[1].replace(/-/g, " ");
      const capitalizedErrMsg =
        errorMsg.slice(0, 1).toUpperCase() + errorMsg.slice(1);
      errorFunc(capitalizedErrMsg);
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      urlFunc(url);
      progressFunc(0);
      errorFunc(null);
    }
  );
};

export default addFileToStorage;

export const addFileToFirestore = async (
  collectionName: string,
  url: string,
  uid: string,
  description: string,
  comments: { comment: string; uid: string }[] | [],
  likes: string[] | []
) => {
  const createdAt = serverTimestamp();
  addDoc(collection(db, collectionName), {
    url,
    createdAt,
    uid,
    description,
    comments,
    likes,
  });
};

export const getFirestoreFeed = async (collectionName: string) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const documents: {
    createdAt: Timestamp;
    url: string;
    id: string;
    uid: string;
    description: string;
    comments: { comment: string; uid: string }[] | [];
    likes: string[] | [];
  }[] = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return documents;
};
