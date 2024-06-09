import React, { useState, useEffect } from 'react'
import styles from '@/styles/components/Statistics.module.css'

/**
 * Displays account information.
 */
function Account({ initialState }) {
  const [state, setState] = useState(
    initialState
  );

  // React only calls useState() once during the first render. useEffect will continously update the state if initialState changes.
  useEffect(() => {
    const newState = {...initialState};
    newState['rank'][0] = newState['rank'][0].charAt(0).toUpperCase() + newState['rank'][0].slice(1).toLowerCase();
    setState(newState);
  }, [initialState]);

  console.log(state)

  return (
    <div className={styles.profile}>
      <div className={styles['profile-info']}>
        <div className={styles['profile-header']}>
          <img src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/' + state['icon'] + '.png'} alt='Profile Icon' className={styles['profile-icon']} />
          <div className={styles['profile-details']}>
            <h3>{state['gameName']} #{state['tagline']}</h3>
            <p>Level: {state['level']}</p>
          </div>
        </div>
        <div className={styles['profile-stats']}>
          <button>Update</button>
        </div>
      </div>
      <div className={styles['ranked-solo']}>
        <h2>Ranked Solo</h2>
        <div className={styles.rank}>
          <img src={`./images/Rank=${state['rank'][0]}.png`} alt='Gold 4' />
          <div className={styles['rank-details']}>
            <h3>{state['rank'].slice(0, 2).join(' ')}</h3>
            <p>{state['rank'][2]} LP</p>
            <p>{state['wr'][0]}W {state['wr'][1]}L</p>
            <p>Win Rate: {Math.round((state['wr'][0] / (state['wr'][0] + state['wr'][1])) * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;