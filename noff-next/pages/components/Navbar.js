import React from 'react'
import { useRouter } from 'next/router'
function Navbar() {
    const router = useRouter()
  return ( 
    <div className='navbar' style={{position: 'fixed'}}> 
    <ul className="links">
        <li onClick={() => router.push('/')}> Home </li>
        <li onClick={() => router.push('/manual')}> Model Input </li>
        <li onClick={() => router.push('/live')}> Live Input </li>
    </ul>
    </div>
  )
}

export default Navbar