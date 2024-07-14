// Import necessary modules
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import SignUp from "./signup";
import Login from "./login";
import User from "./user";
import HomePage from "@/components/HomePage";
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component
import React from "react";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />

      {/* Example navigation links */}
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
      </nav>

      {/* Example routing logic */}
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
      <PrivateRoute>
        <Login />
      </PrivateRoute>
      <PrivateRoute>
        <SignUp />
      </PrivateRoute>
      <PrivateRoute>
        <User />
      </PrivateRoute>
    </AuthProvider>
  );
}

export default App;