// Import necessary modules
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import SignUp from "./signup";
import Login from "./login";
import User from "./user";
import HomePage from "@/components/HomePage";
import React from "react";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component



function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />

      {/* Example navigation links
      <nav>
        <ul>
          <li>
            <a href="/" onClick={() => router.push('/')}>Home</a>
          </li>
          <li>
            <a href="/login" onClick={() => router.push('/login')}>Login</a>
          </li>
          <li>
            <a href="/signup" onClick={() => router.push('/signup')}>Signup</a>
          </li>
          <li>
            <a href="/user" onClick={() => router.push('/user')}>User</a>
          </li>
          <li>
            <a href="/updateprofile" onClick={() => router.push('/updateprofile')}>Update Profile</a>
          </li>
        </ul>
      </nav> */}


    </AuthProvider>
  );
}

export default App;