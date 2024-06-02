import React from 'react'
import SearchBar from './SearchBar'
import { useState } from 'react'


function Champ() {
  const [champName, setChampName] = useState("");
  const setChamp = (name) => {
    setChampName(name);
  }
  return (
    <div className="image_box">
      <figure>
      <img className='champ_img' src={"champ_image/"+champName+"_0.jpg"} alt={"Select champ"} />
      </figure>
      <SearchBar champCall={setChamp}/>

    </div>
  )
}

export default Champ