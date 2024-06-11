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
    <Accessories playerData={playerData}/>        
    <button onClick={handleClick}> Show full match </button>
    {showMore ? <Match match={props.match}/> : null}
    </div>
  )
}

export default MatchOuter