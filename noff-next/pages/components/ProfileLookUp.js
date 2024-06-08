import React from 'react'
import axios from 'axios'

function ProfileLookUp() {
    const handleChange = (e) => {
        // implement the history search here
        
    }
  return (
    <div className='search-container'>
        <input type='text' className='p-1 border rounded' onChange={handleChange}></input>
    </div>
  )
}

export default ProfileLookUp