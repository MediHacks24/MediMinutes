import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'



export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage('')

    setError('');
    setLoading(true);
    try {
        await resetPassword(emailRef.current.value)
        setMessage('Please Check Your Email')
    //   await login(emailRef.current.value, passwordRef.current.value); // Assuming signup takes email and password
    //   router.push('/');
    } catch (error) {
      // You might want to handle successful signup redirection or notification here
    
      setError('Reset failed somehow');
    }
    setLoading(false);
  }

  return (

    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-y-3 mb-6 text-center">
        <h2 className="text-5xl font-bold">Reset Password</h2>
        {error && <Alert variant="filled" severity="error">{error}</Alert>}
        <h3 className="text-xl text-gray-600"></h3>


      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-md mb-4">
        
        <div className="flex flex-col gap-y-1">
            
          <label htmlFor="email" className="text-lg">Email        {message && <Alert variant="filled" severity="success">{message}</Alert>}
          </label>
          <input
            type="email"
            ref={emailRef}
            required
            name="email"
            placeholder="flysinmouthneednow99@swampmail.com"
            className="px-2 py-2 rounded-xl border border-gray-300"
          />
          
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-6 p-2 bg-[rgb(32,172,88)] text-white px-2 py-2 rounded-xl w-full max-w-md"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
          
        </button>
      </form>

      <div className="w-100 text-center mt-2">
        Suddenly Remember Your Password? GOOD JOB!!!!
        <Link href='/login' style={{ color: 'rgb(32,172,88)' }} className='text-green-rgb(32,172,88) px-1 rounded-md py-1'>Log In Here</Link>
    </div>
      <div className="w-100 text-center mt-2">
        No Profile?
        <Link href='/signup' style={{ color: 'rgb(32,172,88)' }} className='text-green-rgb(32,172,88) px-1 rounded-md py-1'>Sign Up Here</Link>
   
      </div>
    </div>
  )
}