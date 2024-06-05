import React from 'react'
import { useRouter } from 'next/router'

function Navbar() {
    const router = useRouter()
  return ( 
    <div
    style={{position: 'fixed'}}
    className="navbar flex  justify-between items-center p-4 bg-gray-800 text-white w-full"
    > 
    <h1>'{'noff'}'</h1>
    <ul className="links flex justify-space-between items-center gap">
        <li onClick={() => router.push('/')}> Home </li>
        <li onClick={() => router.push('/aboutus')}> About Us </li>
        <li onClick={() => router.push('/')}> Placeholder </li>
    </ul>
    </div>
  )
}

export default Navbar