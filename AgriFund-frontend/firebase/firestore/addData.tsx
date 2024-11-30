import firebase_app from "../config";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const updateUserData = async (collection: string, docId: string, updatedData: any) => {
    try {
      const docRef = doc(db, collection, docId);
      await updateDoc(docRef, updatedData);
    //   console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

// how to use the addData
// 'use client'
// import addData from "@/firebase/firestore/addData";

// export default function Home() {

//   const handleForm = async () => {
//     const data = {
//       name: 'John snow',
//       house: 'Stark'
//     }
//     const { result, error } = await addData('users', 'user-id', data)

//     if (error) {
//       return console.log(error)
//     }
//   }

//   return (
//     ...
//   )
// }