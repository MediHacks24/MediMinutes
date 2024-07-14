import React, { useContext, useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase"; // Make sure to import your Firebase configuration


import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function signup(email, password, username) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Construct document reference
            const docRef = doc(db, `users/${user.uid}`);
    
            // Set document data
            await setDoc(docRef, {
                username: username,
                completed: []
            });
    
            // Update current user state
            setCurrentUser(user);
    
            return user;
        } catch (error) {
            // Handle signup errors here
            console.error("Error signing up:", error);
            throw error; // Rethrow the error for handling in your component
        }
    }




    async function login(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }

    function logout() {
        return signOut(auth)
    }
    
    function resetPassword(email)
    {
        return sendPasswordResetEmail(auth, email)
    }

    function updatesEmail(email){
        return updateEmail(auth.currentUser,email)
    }

    function updatesPassword(password){
        return updatePassword(auth.currentUser,password)
    }

    async function updateUserProfile(data) {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        return updateDoc(userDoc, data);
    }

    async function getUserData() {
        if (!auth.currentUser) return null;
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        return userDoc.exists() ? userDoc.data() : null;
    }



    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword,
        updatesEmail,
        updatesPassword,
        updateUserProfile,
        getUserData
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
