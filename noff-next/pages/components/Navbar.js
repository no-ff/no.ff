import React from 'react'
import { useRouter } from 'next/router'
function Navbar() {
    const router = useRouter()
  return ( 
    <div className='navbar'> 
    <ul className="links">
        <li onClick={() => router.push('/')}> Home </li>
        <li onClick={() => router.push('/input')}> Input </li>
    </ul>
    </div>
  )
}

export default Navbar