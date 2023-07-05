import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  updateDoc,
  or,
  and,
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
  likes: string[] | [],
  tags: string[] | null
) => {
  const createdAt = serverTimestamp();
  addDoc(collection(db, collectionName), {
    url,
    createdAt,
    uid,
    description,
    comments,
    likes,
    tags,
  });
};

export const getFirestoreFeed = async (collectionName: string) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
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

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return documents;
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

export const getComments = async (postID: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  return docSnap.data()?.comments;
};

export const getProfileFeed = async (uid: string) => {
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};

export const getDocument = async (postID: string) => {
  const docRef = doc(db, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();
};

export const getLikedFeed = async (uid: string) => {
  const q = query(
    collection(db, "posts"),
    where("likes", "array-contains", uid)
  );
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};

export const getSearchFeed = async (tag: string) => {
  const q = query(
    collection(db, "posts"),
    where("tags", "array-contains", tag)
  );
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};

export const createChat = async (senderID: string, receiverID: string) => {
  addDoc(collection(db, "chats"), {
    senderID,
    receiverID,
    updatedAt: serverTimestamp(),
    messages: [],
  });
};

export const getChat = async (senderID: string, receiverID: string) => {
  const q = query(
    collection(db, "chats"),
    or(
      and(
        where("senderID", "==", senderID),
        where("receiverID", "==", receiverID)
      ),
      and(
        where("receiverID", "==", senderID),
        where("senderID", "==", receiverID)
      )
    )
  );
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents[0];
};

export const getChatByID = async (chatID: string) => {
  const docRef = doc(db, "chats", chatID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return { ...docSnap.data(), id: chatID };
};

export const getAllUserChats = async (uid: string) => {
  const q = query(
    collection(db, "chats"),
    or(where("receiverID", "==", uid), where("senderID", "==", uid)),
    orderBy("updatedAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const documents = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};

export const addChatMessage = async (
  chatID: string,
  senderID: string,
  message: string
) => {
  const docRef = doc(db, "chats", chatID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      messages: [
        ...docSnap.data().messages,
        {
          senderID,
          message,
        },
      ],
    });
  }
};
