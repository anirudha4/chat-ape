import { db } from "@config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const insertOne = async (collectionName, payload, uid) => {
    try {
        const docRef = await setDoc(doc(db, collectionName, uid), payload,{ merge: true });
        return docRef;
    } catch (error) {
        console.log(error);
    }
};

export const addDocument = async (collectionName, payload) => {
    try{
      const docRef = await addDoc(collection(db, collectionName), payload);
    } catch(err){
      console.log(err);
    }
}