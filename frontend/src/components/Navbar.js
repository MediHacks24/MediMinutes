import React from 'react'

export default function Navbar() {
  return (
    <nav className='w-full h-[100px]'>
        <ul>
            <li className=''>
            <a href='/'>Home</a>
            </li>
            <li>
            <a href='/about'>About</a>
            </li>
        </ul>
    </nav>
  )
}
