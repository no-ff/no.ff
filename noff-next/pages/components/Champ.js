import React from 'react'
import { useState, useEffect } from 'react'

function Champ({ name }) {
  const [champName, setChampName] = useState(name);

  useEffect(() => {
    if (name === 'Wukong') {
      setChampName('MonkeyKing');
    } 
  });

  return (
    <div className='image_box '>
      <figure>
        <img className='champ_img' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/' + champName + '.png'} />
        <figcaption>{champName}</figcaption>
      </figure>
    </div>
  )
}

export default Champ