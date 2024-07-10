import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-[100vw] h-fit fixed top-0 z-[100] bg-white border-b border-black'>
      <div className='items-center flex flex-row gap-x-6 text-2xl px-8 py-2'>
        <div className='flex-1 text-white h-full'>
          <Link href='/' className='bg-[#20AC58] px-5 rounded-md py-2'>Logo</Link>
        </div>
        <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center'>
          <Link href='/about' className='text-black'>About</Link>
          <Link href='/features' className='text-black'>Features</Link>
          <Link href='/categories' className='text-black'>Categories</Link>
        </div>
        <div className='flex-[1] flex flex-row h-full gap-x-4 content-center text-white rounded-md px-5 justify-end'>
          <Link href='/account' className='text-black py-2'>Log In</Link>
          <Link href='/' className='bg-[#20AC58] px-5 rounded-md py-2'>Sign In</Link>
        </div>
      </div>
    </nav>
  )
}
