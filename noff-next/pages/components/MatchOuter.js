import React from 'react'
import { useState } from 'react'
import Match from './Match';


function MatchOuter(props) {
    const [showMore, setShowMore] = useState(false);

    const handleClick = () => {
        setShowMore(!showMore);
    }
  return (
    <div>
        <dl>
            <dd><img src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/'+'1001' +'.png'}/> </dd>
            

        </dl>
    <button onClick={handleClick}> {props.player} </button>
    {showMore ? <Match match={props.match}/> : null}
    </div>
  )
}

export default MatchOuter