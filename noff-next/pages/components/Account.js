import React, { useState, useEffect } from 'react'
import styles from '@/styles/components/Statistics.module.css'

/**
 * Displays account information.
 */
function Account(props) {
  props.state['rank'][0] = props.state['rank'][0].charAt(0).toUpperCase() + props.state['rank'][0].slice(1).toLowerCase();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleClick = () => {
    //props.update()
    setIsButtonDisabled(true);
    setRemainingTime(120);

    const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsButtonDisabled(false);
      setRemainingTime(0);
    }, 120000);
  };


  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
      <div className={styles.profile}>
        <div className={styles['profile-info']}>
          <div className={styles['profile-header']}>
            <img src={'https://ddragon.leagueoflegends.com/cdn/14.11.1/img/profileicon/' + props.state['icon'] + '.png'} alt='Profile Icon' className={styles['profile-icon']} />
            <div className={styles['profile-details']}>
              <h3>{props.state['gameName']} #{props.state['tagline']}</h3>
              <p>Level: {props.state['level']}</p>
            </div>
          </div>
          <div className={styles['profile-stats']}>
          <div>
            <button disabled={isButtonDisabled} onClick={handleClick} style={{ backgroundColor: isButtonDisabled ? 'grey' : 'blue' }}>
              {isButtonDisabled ? `Next update available in ${remainingTime} seconds` : 'Update'}
            </button>
          </div>
          </div>
        </div>
        <div className={styles['ranked-solo']}>
          <h2>Ranked Solo</h2>
          <div className={styles.rank}>
            <img src={`./images/Rank=${props.state['rank'][0]}.png`} alt='Gold 4' />
            <div className={styles['rank-details']}>
              <h3>{props.state['rank'].slice(0, 2).join(' ')}</h3>
              <p>{props.state['rank'][2]} LP</p>
              <p>{props.state['wr'][0]}W {props.state['wr'][1]}L</p>
              <p>Win Rate: {Math.round((props.state['wr'][0] / (props.state['wr'][0] + props.state['wr'][1])) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;