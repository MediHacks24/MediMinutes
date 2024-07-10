import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-full h-fit fixed top-0 z-[999999]'>
      <ul className='flex flex-row gap-x-6 text-2xl pt-4 px-8'>
        <li className='flex-1 text-white'>
          <a href='/' className='bg-[#20AC58] px-5 pb-2 rounded-md'>Logo</a>
        </li>
        <div className='flex-[2] flex flex-row gap-x-20 justify-center text-white rounded-md px-5 pb-2'>
          <Link href='/' className='text-black'>About</Link>
          <Link href='/' className='text-black'>Features</Link>
          <Link href='/' className='text-black'>Resources</Link>
        </div>
        <div className='flex-[1] flex flex-row justify-end gap-x-4 text-white rounded-md px-5 pb-2'>
          <Link href='/' className='text-black'>Log In</Link>
          <Link href='/' className='bg-[#20AC58] text-white rounded-md px-5 pb-2'>Sign Up</Link>
        </div>
      </ul>
    </nav>
  )
}