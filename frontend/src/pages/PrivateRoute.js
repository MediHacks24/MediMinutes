import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authContext';
import React, { useState, useEffect } from "react";


function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return children;
}

export default PrivateRoute;