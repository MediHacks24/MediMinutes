import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter();

  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className='w-[100vw] h-fit fixed top-0 z-[100] bg-[#242638] border-b border-black'>
      <div className='items-center flex flex-row gap-x-6 text-2xl px-8 py-2'>
        <div className='flex-1 text-white h-full'>
        {router.pathname === '/' ? (
          <a onClick={() => scrollToSection('Home')} className='bg-[#20AC58] px-5 rounded-md py-2'>Logo</a>
        ) : (
          <Link href='/' className='bg-[#20AC58] px-5 rounded-md py-2'>Logo</Link>
        ) }
          </div>
        <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center'>
          {router.pathname === '/' ? (
            <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center'>
              <a onClick={() => scrollToSection('About')} className='fontWhite cursor-pointer'>About</a>
              <a onClick={() => scrollToSection('Features')} className='fontWhite cursor-pointer'>Features</a>
              <Link href='/categories' className='fontWhite'>Categories</Link>
            </div>
          ) : (
            <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center'>
            <Link href="/?section=About" className='fontWhite'>About</Link>
            <Link href="/?section=Features" className='fontWhite'>Features</Link>
              <Link href='/categories' className='fontWhite'>Categories</Link>
            </div>
          )}
        </div>
        <div className='flex-[1] flex flex-row h-full gap-x-4 content-center text-white rounded-md px-5 justify-end'>
          <Link href='/login' className='fontWhite py-2'>Log In</Link>
          <Link href='/signup' className='bg-[#20AC58] px-5 rounded-md py-2'>Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}
