import React, {useState} from 'react';
import firebase from 'firebase/app';; // Update path as per your file structure
import 'firebase/auth'; // Import Firebase authentication module


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  


    const handleSignUp = async (event) => {
        console.log(email,username,password)
        event.preventDefault();
        try {
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
          // Optionally, update the user's display name
          await userCredential.user.updateProfile({
            displayName: username
          });
          // Clear form fields
          setEmail('');
          setUsername('');
          setPassword('');
          // Optionally, redirect to another page or show a success message
          console.log('User signed up successfully:', userCredential.user);
        } catch (error) {
          console.error('Error signing up:', error.message);
          // Handle error (e.g., display error message to user)
        }
      };










  return (
    <div className='w-[100vw] flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='flex flex-col gap-y-3 mb-6 text-center'>
        <h2 className='text-5xl font-bold'>Sign Up</h2>
        <h3 className='text-xl text-gray-600'>Enjoy Learning ;3</h3>
      </div>
      <form onSubmit={handleSignUp} className='flex flex-col gap-y-4 w-full max-w-md mb-4'>
        <div className='flex flex-col gap-y-1'>
          <label htmlFor='email' className='text-lg'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='frogger55@swampmail.com'
            className='px-2 py-2 rounded-xl border border-gray-300'
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label htmlFor='username' className='text-lg'>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='XxSupremeGamerxX'
            className='px-2 py-2 rounded-xl border border-gray-300'
          />
        </div>
        <div className='flex flex-col gap-y-1'>
          <label htmlFor='password' className='text-lg'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Hehe123'
            className='px-2 py-2 rounded-xl border border-gray-300'
          />
        </div>
        <button
          type='submit'
          className='mt-6 p-2 bg-[rgb(32,172,88)] text-white px-2 py-2 rounded-xl w-full max-w-md'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}