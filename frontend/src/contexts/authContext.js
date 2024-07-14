import React, { useContext, useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 

import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
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
        updatesPassword
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
