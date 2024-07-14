import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { currentUser, updatesPassword, updatesEmail, getUserData, updateUserProfile } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();


  
  useEffect(() => {
    if (!currentUser) {
        router.push('/');
    }
}, [currentUser, router]);

  useEffect(() => {
    async function fetchUserData() {
      const data = await getUserData();
      setUserData(data);
      if (data) {
        usernameRef.current.value = data.username;
      }
    }

    fetchUserData();
  }, [getUserData]);


  function handleSubmit(e) {
    e.preventDefault();

    // Reset previous errors
    setError('');

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    
    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updatesEmail(emailRef.current.value));
    // }

    if (passwordRef.current.value) {
      promises.push(updatesPassword(passwordRef.current.value));
    }

    if (usernameRef.current.value !== userData?.username) {
      promises.push(updateUserProfile({ username: usernameRef.current.value }));
    }

    setLoading(true);

    Promise.all(promises)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Failed to update account', error);
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-y-3 mb-6 text-center">
        <h2 className="text-5xl font-bold">Update Profile</h2>
        <h3 className="text-xl text-gray-600">Update your username and/or password</h3>
        {error && <Alert variant="filled" severity="error">{error}</Alert>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-md mb-4">

      <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="text-lg">Username</label>
          <input
            type="text"
            ref={usernameRef}
            name="username"
            placeholder="Username"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-lg">Password</label>
          <input
            type="password"
            ref={passwordRef}
            name="password"
            placeholder="Leave blank to keep the same"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="passwordConfirm" className="text-lg">Confirm Password</label>
          <input
            type="password"
            ref={passwordConfirmRef}
            name="passwordConfirm"
            placeholder="Leave blank to keep the same"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-6 p-2 bg-[rgb(32,172,88)] text-white px-2 py-2 rounded-xl w-full max-w-md"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>

      <div className="w-100 text-center mt-2">
        <Link href='/' style={{ color: 'rgb(32,172,88)' }} className='text-green-rgb(32,172,88) px-1 rounded-md py-1'>Cancel</Link>
      </div>
    </div>
  );
}