import React from 'react'
import SearchBar from './SearchBar'
import { useState } from 'react'

function Champ({ name }) {
  const [champName, setChampName] = useState(name);

  const setChamp = (name) => {
    if (name == 'FiddleSticks') {
      name = 'Fiddlesticks';
    }
    if (name == 'MonkeyKing') {
      name == 'Wukong';
    }
    setChampName(name);
  }

  return (
    <div className='image_box'>
      <figure>
        <img className='champ_img' src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/' + champName + '.png'} />
        <figcaption>{champName}</figcaption>
      </figure>
      <SearchBar champCall={setChamp} />
    </div>
  )
}

export default Champ