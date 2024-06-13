import React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

function Navbar() {
    const noff = "{noff}";
    const router = useRouter()
  return (
    <div
    style={{position: 'fixed'}}
    className="navbar flex  justify-between items-center p-4 bg-gray-800 text-white w-full"
    >
    <title>no.ff</title>
    <h1>{ String(noff) }</h1>
    <ul className="links flex justify-space-between items-center gap">
        <li className="mx-5" onClick={() => router.push('/')}> Home </li>
        <li className="mx-5" onClick={() => router.push('/aboutus')}> About Us </li>
        <motion.li className="mx-5" 
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => router.push('/profile')}> Statistics   
        </motion.li>
    </ul>
    </div>
  )
}

export default Navbar