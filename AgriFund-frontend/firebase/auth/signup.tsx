import app from "../config";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, User } from "firebase/auth";
import { useAuthContext } from '@/context/AuthContext';
import addData from "../firestore/addData";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import errorPage from "@/components/ui/errorPage";

const auth = getAuth(app);
type dataProps = {
    name: { firstName: string; lastName: string; }
    email: string,
    role: string
}

export default async function signUp(firstName: string, lastName: string, email: string, password: string) {
    let result = null,
        error = null,
        user: User | null = null;

    const data: dataProps = {
        name: {
            firstName: firstName,
            lastName: lastName,
        },
        email: email,
        role: '',
    }

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        // user = auth.currentUser
        user = result.user

        const db = getFirestore(app)
        const userRef = doc(db, 'users', `${user?.uid}`);
        await setDoc(userRef, data, { merge: true });

        sendEmailVerification(user)
    } catch (e) {
        error = e;
        console.error(error);
    }

    return { result, error };
}

export const resendEmailVerification = () => {
    const { user } = useAuthContext();

    if (!user) {
        errorPage('You are not logged in!', true, 'Login')
        return
      }    

    try {
        sendEmailVerification(user)
        // console.log('Verification email sent successfully');
    } catch (e) {
        console.error(e);
    }
    // https://css-tricks.com/user-registration-authentication-firebase-react/
}