import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../config";
import { signInWithEmailAndPassword, UserCredential, getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
    let user = null,
        error = null;

    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;

        // console.log('Signed in user:', user);
    } catch (e) {
        error = e;
        console.error(error);
    }

    return { user, error };
}

type dataProps = {
    name: { firstName: string; lastName: string; }
    email: string,
    role: string
}


export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const auth = getAuth();

    let user,
        error;

    try {
        // let result = await signInWithRedirect(auth, provider); // sign in with redirect
        let result = await signInWithPopup(auth, provider);  //sign in with popup
        user = result.user;
        // console.log('Signed in user:', user);

        const data: dataProps = {
            name: {
                firstName: `${user.displayName ? user.displayName.split(" ")[0] : ''}`,
                lastName: `${user.displayName ? user.displayName.split(" ")[1] : ''}`,
            },
            email: `${user.email}`,
            role: '',
        }
                
        const db = getFirestore(app)
        const userRef = doc(db, 'users', `${user?.uid}`);
        await setDoc(userRef, data, { merge: true });
    } catch (e) {
        error = e
        console.error(e);
    }
    return { user, error }
}
// https://clerk.com/docs/authentication/social-connections/google#configuring-google-social-connection