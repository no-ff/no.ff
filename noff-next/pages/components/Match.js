import React, { useState, useEffect } from 'react'
import styles from '@/styles/components/Statistics.module.css'

function Match({ props }) {
  const [state, setState] = useState(props);
  const [match, setMatch] = useState([]);

  // React only calls useState() once during the first render. useEffect will continously update the state if props changes.
  useEffect(() => {
    const newState = { ...props };
    setState(newState);
    const newMatch = Object.values(newState)[0];
    setMatch(newMatch);
    console.log(newMatch)
  }, [props]);

  const team1 = match.slice(0, 5);
  const team2 = match.slice(5, 10);

  const renderTable = (team) => (
    <table className={styles.matchTable}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Champion</th>
          <th>KDA</th>
          <th>CS</th>
          <th>CS/min</th>
          <th>Wards</th>
          <th>Damage</th>
          <th>Damage<br />Taken</th>
          <th>Win</th>
        </tr>
      </thead>
      <tbody>
        {team.map((player, index) => (
          <tr key={index}>
            <td title={player.username}>{player.username}</td>
            <td>{player.champion}</td>
            <td>{player.kda}</td>
            <td>{player.cs}</td>
            <td>{player.cs_per_min}</td>
            <td>{player.wards}</td>
            <td>{player.damage}</td>
            <td>{player.damageTaken}</td>
            <td>{player.win ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={styles.matchContainer}>
      {renderTable(team1)}
      {renderTable(team2)}
    </div>
  );
}

export default Match

// <div class="flex">
//   <div class="my-auto h-full min-w-fit">
//     <div class="flex">
//       <div>
//         <img alt="Champion Image: Karthus" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/championimage.34541.40-karthus.jpg" style="color: transparent;" />
//         <div class="flex"><img alt="" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png" style="color: transparent;" /><img alt="" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png" style="color: transparent;" /></div>
//       </div>
//       <div><img alt="Spell image: 4" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" src="https://raw.communitydragon.org/14.10/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png" style="color: transparent;" /><img alt="Spell image: 11" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" src="https://raw.communitydragon.org/14.10/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_smite.png" style="color: transparent;" /><img alt="" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70181.30-3364.jpg" style="color: transparent;" /></div>
//     </div>
//   </div>
//   <div class="my-auto ml-1 h-full min-w-fit">
//     <div class="grid grid-cols-3">
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70068.30-2503.jpg" style="color: transparent;" /></div>
//       </div>
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70155.30-3145.jpg" style="color: transparent;" /></div>
//       </div>
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70296.30-6653.jpg" style="color: transparent;" /></div>
//       </div>
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70082.30-3020.jpg" style="color: transparent;" /></div>
//       </div>
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70121.30-3089.jpg" style="color: transparent;" /></div>
//       </div>
//       <div>
//         <div tabindex="1" role="button" style="cursor: pointer;"><img alt="Item image" loading="lazy" width="30" height="30" decoding="async" data-nimg="1" class="m-[1px] rounded-md" src="https://lolsite-static.s3-us-west-2.amazonaws.com/media/IMAGECACHE/itemimage.70149.30-3137.jpg" style="color: transparent;" /></div>
//       </div>
//     </div>
//   </div>
// </div>