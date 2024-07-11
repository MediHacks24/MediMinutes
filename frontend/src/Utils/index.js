import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"


const AuthContext = React.createContext();


export function useAuth(){ // hook
    return useContext(AuthContext);
}


export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null); //user info saved here
    const [userLoggedIn, setUserLoggedIn] = useState(False); //if logged in, set to true
    const [loading, setLoading] = useState(true); //true when trying to determine current auth state of user


    useEffect(()=>{     // listen to event changes (login/logout)

        const unsubscribe = onAuthStateChanged(auth, initializeUser); 
        return unsubscribe; // when auth provider component is unmounted we return
    },[])

    async function initializeUser(user) { //when user logged in, provide user info
        if (user) {
            setCurrentUser({...user}); //spread out user's properties into new object so we don't have ref to user argument above
            setUserLoggedIn(true)
        }
        else {
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false); //no longer trying to determine auth state
    } 


    const value = { //expose variables which we return below
        currentUser,
        userLoggedIn,
        loading
    }

    return ( 
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}