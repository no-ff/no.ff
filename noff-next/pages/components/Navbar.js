import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

function Navbar() {
    const noff = "{noff}";
    const router = useRouter();

    // Function to determine if a link is active
    const isActive = (href) => {
        return router.pathname === href ? 'active' : '';
    };

    return (
        <div style={{ position: 'fixed' }} className="navbar flex justify-between items-center p-4 bg-gray-800 text-white w-full">
            <title>no.ff</title>
            <h1>{String(noff)}</h1>
            <ul className="links flex justify-space-between items-center gap">
                <motion.li className={`${isActive('/')} mx-5 `} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push('/')}> Home </motion.li>
                <motion.li className={`${isActive('/aboutus')} mx-5 `} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push('/aboutus')}> About Us </motion.li>
                <motion.li className={`${isActive('/profile')} mx-5 `} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => router.push('/profile')}> Statistics </motion.li>
            </ul>
        </div>
    );
}

export default Navbar;
