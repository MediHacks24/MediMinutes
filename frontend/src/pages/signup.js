import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'


export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)
    console.log(usernameRef.current.value)

    
      setError('');
      setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value); // Assuming signup takes email and password
      router.push('/');
    } catch (error) {
      // You might want to handle successful signup redirection or notification here
    
      setError('Sign up failed');
    }
    setLoading(false);
  }

  return (

    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-y-3 mb-6 text-center">
        <h2 className="text-5xl font-bold">Sign Up</h2>
        <h3 className="text-xl text-gray-600">Enjoy Learning ;3</h3>
        {error && <Alert variant="filled" severity="error">{error}</Alert>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-md mb-4">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email" className="text-lg">Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            name="email"
            placeholder="frogger55@swampmail.com"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="username" className="text-lg">Username</label>
          <input
            type="text"
            ref={usernameRef}
            required
            name="username"
            placeholder="frogbiter747"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="password" className="text-lg">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            name="password"
            placeholder="Hehe123"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="passwordConfirm" className="text-lg">Confirm Password</label>
          <input
            type="password"
            ref={passwordConfirmRef}
            required
            name="passwordConfirm"
            placeholder="Hehe123"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-6 p-2 bg-[rgb(32,172,88)] text-white px-2 py-2 rounded-xl w-full max-w-md"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
          
        </button>
      </form>

      <div className="w-100 text-center mt-2">
        Already Have An Account?
        <Link href='/login' style={{ color: 'rgb(32,172,88)' }} className='text-green-rgb(32,172,88) px-1 rounded-md py-1'>Log In Here</Link>
   
      </div>
    </div>
  )
}