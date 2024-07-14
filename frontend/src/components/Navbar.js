import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter();

  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className='w-[100vw] h-[65px] fixed top-0 z-[100] bg-[#242638] border-b border-black'>
      <div className='items-center flex flex-row gap-x-6 px-8 py-1.5 '>
        <div className='flex-1 text-white h-full'>
            {router.pathname === '/' ? (
              <div className='flex flex-row gap-x-0 content-center cursor-pointer'>
                <img className='size-11 self-center' src='/images/medfrog.png' alt='MediMinutes Logo' />
                <a onClick={() => scrollToSection('Home')} className=' pt-3 px-2 rounded-md text-3xl py-2 HanumanFont'>MediMinutes</a>
              </div>
            ) : (
              <div className='flex flex-row gap-x-0 content-center cursor-pointer'>
                <img className='size-11 self-center' src='/images/medfrog.png' alt='MediMinutes Logo' />
                <Link href='/' className='px-2 rounded-md text-3xl py-2 pt-3 HanumanFont'>MediMinutes</Link>
            </div>
            ) }
          </div>
        <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center'>
          {router.pathname === '/' ? (
            <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 text-lg justify-center'>
              <a onClick={() => scrollToSection('About')} className='fontWhite cursor-pointer'>About</a>
              <a onClick={() => scrollToSection('OurTeam')} className='fontWhite cursor-pointer'>Our Team</a>
              <Link href='/categories' className='fontWhite'>Categories</Link>
            </div>
          ) : (
            <div className='flex-[2] flex flex-row gap-x-20 h-full text-white rounded-md px-5 justify-center  text-lg'>
            <Link href="/?section=About" className='fontWhite'>About</Link>
            <Link href="/?section=OurTeam" className='fontWhite'>Our Team</Link>
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
