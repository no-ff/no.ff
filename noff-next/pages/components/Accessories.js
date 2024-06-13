import React from 'react'

function Accessories(props) {

    var first = false
    for (var path in props.playerData['runes']){
        if (first) var secondaryPath = path;
        else {
            first = true;
            var primaryPath = path;
        }
    }
    const keystone = props.playerData['runes'][primaryPath][0].replace(/\s/g, '')
    var secNum = '0';
    var map ={'Domination': 7200, 'Inspiration': 7203, 'Precision': 7201, 'Resolve': 7204, 'Sorcery': 7202}

    if (secondaryPath === 'Inspiration') secondaryPath = 'Whimsy'

  return (
   <div className='accessories'>
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
        <dl className='runes'>
            <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + primaryPath + '/'+ keystone + '/' +keystone + '.png'}></img></dd>
            <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + map[secondaryPath] + '_'+ [secondaryPath] +'.png'}></img></dd>

        </dl>

   </div> 
  )
}

export default Accessories