import React from 'react'

function Accessories(props) {
  return (
   <div>
        <div className='champ'>
            <img src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/'+props.playerData['champion']+'.png'}></img>
        </div>
        <dl className='items'>
            {props.playerData['items'].map((item) => (
                item !== 0 ?
                <div>
                    <dt><img src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/'+item +'.png'}></img></dt>
                </div>
                :
                <div>
                    <dt><img src={'https://upload.wikimedia.org/wikipedia/commons/6/66/SmileyFace.png'}></img></dt>
                </div>
            ))}
        </dl>


   </div> 
  )
}

export default Accessories