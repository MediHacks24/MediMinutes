import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return doSignInWithEmailAndPassword(auth, email, password);
};


export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); //get provider value
    const result = await signInWithPopup(auth, provider);

    //result.user (if we want to save to firestore)
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth, currentUser, {
//         url: '${window.location.origin}/home',
//     });
// };