import app from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const signOut = async () => {
    let result = null,
        error = null;
    try {
        await auth.signOut();
    } catch (e) {
        error = e;
        console.error(error);
    }
    
};

export default signOut