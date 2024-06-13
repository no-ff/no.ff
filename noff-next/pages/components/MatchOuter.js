import React from 'react'
import { useState } from 'react'
import Match from './Match';
import Items from './Accessories';
import Accessories from './Accessories';


function MatchOuter(props) {
    const [showMore, setShowMore] = useState(false);
    var playerData = [];
    for (var i =0; i < props.match['match'].length; i++){
        if (props.match['match'][i]['riotId'] === props.player){
            playerData= props.match['match'][i];
    }}
    const handleClick = () => {
        setShowMore(!showMore);
    }
    console.log(playerData)
  return (
    <div>
      <div className={playerData.win ? 'match-block bg-gradient-to-r from-[#005A82] to-[#091428] rounded-md' : 'match-block bg-gradient-to-r from-[#450a0a] to-[#7f1d1d] bg-opacity-30 rounded-md'} >
        <Accessories playerData={playerData} matchData={props.match}/>        
        <button onClick={handleClick}> Show full match </button>
    </div>
    {showMore ? <Match match={props.match}/> : null}
    </div>
  )
}

export default MatchOuter