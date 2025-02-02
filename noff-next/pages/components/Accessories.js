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
    console.log(first)
    const keystone = props.playerData['runes'][primaryPath][0].replace(/\s/g, '')
    var map ={'Domination': 7200, 'Whimsy': 7203, 'Precision': 7201, 'Resolve': 7204, 'Sorcery': 7202}

    if (secondaryPath === 'Inspiration') secondaryPath = 'Whimsy'
  console.log(props.matchData);
  const team1 = props.matchData['match'].slice(0, 5)
  const team2 = props.matchData['match'].slice(5, 10)
  const team1Names = team1.map((player) => player['riotId'])
  const newTeam1Names = []
  for (var i = 0; i < team1Names.length; i++){
    const arr = team1Names[i].split('#')
    newTeam1Names.push(arr[0])
  }
  const team2Names = team2.map((player) => player['riotId'])
  const newTeam2Names = []
  for (var i = 0; i < team2Names.length; i++){
        const arr = team2Names[i].split('#')
        newTeam2Names.push(arr[0])
    }
  const team1Kda = team1.map((player) => player['kda'])
  const team2Kda = team2.map((player) => player['kda'])
  
  return (
   <div className='accessories'>
        <div className='gameinfo'>
            <p>{props.matchData['time']}</p>
            <p>{props.matchData['game_mode']} </p>
            <p>------</p>
            <p>{props.matchData['game_length']}</p>
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
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/Summoner' + props.playerData['spells'][0] + '.png'}></img></dd>
                        <dd> <img src={'https://ddragon.leagueoflegends.com/cdn/14.12.1/img/spell/Summoner' + props.playerData['spells'][1] +'.png'}></img></dd>

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
                <p>{props.playerData['kda']}</p>
                <p>CS: {props.playerData['cs']} (divide time here for cs/min pls) </p>
                <p>kills</p>
                <p>some more other</p>
            </div>
        </div>
        <div className='players'>
            <div className='team1-names'>
                {newTeam1Names.map((name) => (
                    <p>{name}</p>
                ))}
            </div>
            <div className='team1-kda'>
                {team1Kda.map((kda)=>(
                    <p> {kda}</p>
                ))}
            </div>
            <div className='team2-names'>
                {newTeam2Names.map((name) => (
                    <p>{name}</p>
                ))}
            </div>
            <div className='team2-kda'>
                {team2Kda.map((kda)=>(
                    <p> {kda}</p>
                ))}
            </div>
        </div>

   </div> 
  )
}

export default Accessories