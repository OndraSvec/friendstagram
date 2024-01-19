import { Timestamp } from "firebase/firestore";

export type ChatMessage = {
    createdAt: Timestamp;
    senderID: string;
    receiverID: string;
    message: string;
}

export type ChatUser = {
    email: string;
    name: string | null;
    photo: string | null;
    uid: string;
}

export type Post = {
    comments: { comment: string; uid: string }[];
    createdAt: Timestamp;
    description: string;
    likes: string[];
    uid: string;
    url: string;
    id: string;
}