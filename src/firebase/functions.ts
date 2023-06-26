import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { storage, db } from "./setup";

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
  description: string
) => {
  const createdAt = serverTimestamp();
  addDoc(collection(db, collectionName), {
    url,
    createdAt,
    uid,
    description,
  });
};
