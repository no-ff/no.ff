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
        <div className='gameinfo'>
            <p>06/13/2024</p>
            <p>ranked solo duo</p>
            <p>------</p>
            <p>Victory</p>
            <p>game duration</p>
        </div>

        <div className='middle'>
            <div className='stats'>
                <div className='champ'>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/champion/'+props.playerData['champion']+'.png'}></img>
                </div>
                <div className='runesContainer'>
                    <dl className='runes'>
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + primaryPath + '/'+ keystone + '/' +keystone + '.png'}></img></dd>
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + map[secondaryPath] + '_'+ [secondaryPath] +'.png'}></img></dd>

                    </dl>
                </div>
                <div className='runessContainer'>
                    <dl className='runes    '>
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + primaryPath + '/'+ keystone + '/' +keystone + '.png'}></img></dd>
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/' + map[secondaryPath] + '_'+ [secondaryPath] +'.png'}></img></dd>

                    </dl>
                </div>
                <div className='itemsContainer'>
                    <dl className='items'>
                        {props.playerData['items'].map((item) => (
                            item !== 0 ?
                            <div>
                                <dt><img src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/'+item +'.png'}></img></dt>
                            </div>
                            :
                            <div>
                                <dt><img src={'https://cdn.discordapp.com/attachments/1171511830489878651/1250609854301868084/IMG_2419.jpg?ex=666b90b0&is=666a3f30&hm=f687c7ec57ef8ffc5c5de1d9505e1079bcb65399bc914ebb3e0fa97bfd0aea2a&'}></img></dt>
                            </div>
                        ))}
                    </dl>
                </div>
                
                </div>
            <div className='data'>
                <p>kill parti 50%</p>
                <p>CS/MIN 5.4</p>
                <p>other info</p>
                <p>some more other</p>
            </div>
        </div>
        <div className='players'>
            <div className='team'>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
            </div>
            <div className='team'>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
            </div>
            <div className='team'>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
                <p>albert</p>
            </div>
            <div className='team'>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
                <p>0/10/0</p>
            </div>
        </div>

   </div> 
  )
}

export default Accessories