import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import RiotIdInput from './components/RiotIdInput';
import Account from './components/Account';
import { motion, useAnimationControls } from 'framer-motion';
import styles from '../styles/RiotIdInput.module.css';
import Match from './components/Match';

function profile() {
  const [formData, setFormData] = useState({
    gameName: '',
    tagline: '',
    id: '',
  });

  const [playerData, setPlayerData] = useState({});
  const [matchHistory, setMatchHistory] = useState({});

  const controls = useAnimationControls();
  const handleChange = (e) => {
    const { value } = e.target;
    const findUntil = '#';
    const index = value.indexOf(findUntil);
    setFormData({
      gameName: index !== -1 ? value.substring(0, index) : '',
      tagline: index !== -1 ? value.substring(index + 1) : '',
      id: value,
    })
  }

  const submitData = (e) => {
    if (formData.gameName === '' || formData.tagline === '') { alert('Please enter a valid riot id'); return; }
    e.preventDefault();
    // Get account data.
    axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
      .then(response => {
        const player_data = response.data;
        setPlayerData(player_data);
        axios.post('http://127.0.0.1:8000/DisplayStats/add_new_matches/', formData)
      .then(response => {
        const matches = response.data;
        setMatchHistory(matches);
      }
      )
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
      }
      )
      .catch(error => {
        console.error('There was an error submitting the form !!', error);
      });
    // Get match history.

    
  }
  const test = () => {
    console.log(playerData);
   
  }

  return (
    <div className={styles.centered}>
      <motion.div animate={controls}>
      <form autoComplete="off" onSubmit={submitData}>
        <RiotIdInput
          className={styles.input}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          label="Riot ID:"
          name="riotId"
          value={formData.id}
          onChange={handleChange}
        />
        <button type='submit' className='mt-4 bg-blue-400 px-3 py-1 rounded'>Search</button>
      </form>
      <button onClick={test}>test me</button>
      </motion.div>
      {/* Display Account + Match History data if form submitted succesfully. */}
      {Object.keys(matchHistory).length !== 0 && (
        <>
          <Account
            state={playerData}
          />
          <Match initialState={matchHistory}/>
          {/* <Match /> */}
          {/* <Match /> */}
        </>
      )}
    </div>
  )
}

export default profile