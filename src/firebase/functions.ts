import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { storage, db } from "./setup";
import { User } from "firebase/auth";

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

export const addUserToFirestore = async (user: User) => {
  addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  });
};

export const getUser = async (uid: string) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  return documents[0];
};

export const switchLikedPost = async (postID: string, uid: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (!docSnap.data()?.likes.includes(uid))
      await updateDoc(docRef, {
        likes: [...docSnap.data().likes, uid],
      });
    else
      await updateDoc(docRef, {
        likes: [...docSnap.data().likes.filter((item: string) => item !== uid)],
      });
  }
};

export const isLiked = async (postID: string, uid: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.data()?.likes.includes(uid)) return true;
  else return false;
};

export const getLikes = async (postID: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  return docSnap.data()?.likes.length;
};

export const addComment = async (
  postID: string,
  uid: string,
  comment: string
) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      comments: [
        ...docSnap.data().comments,
        {
          comment,
          uid,
        },
      ],
    });
  }
};
