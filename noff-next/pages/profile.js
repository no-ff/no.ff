import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import RiotIdInput from './components/input/RiotIdInput';
import Account from './components/Account';
import { motion, useAnimationControls } from 'framer-motion';
import styles from '../styles/components/Statistics.module.css';
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

  const handleSubmit = (e) => {
    if (formData.gameName === '' || formData.tagline === '') { alert('Please enter a valid riot id'); return; }
    e.preventDefault();
    // Get account data.
    // console.log(formData) // LOG
    axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
      .then(response => {
        const player_data = response.data;
        setPlayerData(player_data);
        console.log(player_data); // LOG
        // Get match history.
        axios.post('http://127.0.0.1:8000/DisplayStats/add_new_matches/', formData)
          .then(response => {
            const matches = response.data['matches'];
            console.log(matches); // LOG
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
  }

  const showMore = () => {
    console.log(matchHistory.length);
    const inp_data = {length: matchHistory.length, riotID: formData.id}
    console.log(inp_data)
    axios.post('http://127.0.0.1:8000/DisplayStats/show_more_matches/', inp_data)
    .then(response => {
      const matches = response.data;
      console.log(matches); // LOG
      console.log(matchHistory);
      setMatchHistory([...matchHistory, ...matches['matches']]);
    })
    .catch(error => {
      console.error('There was an error submitting the form !!', error);
    }
    )

  }

  return (
    <div style={{height: '100vh'}}>
      <div className={styles.centered} style={{paddingTop: '20vh'}}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <RiotIdInput
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            label="Riot ID:"
            name="riotId"
            value={formData.id}
            onChange={handleChange}
          />
          <button type="submit" className="mt-4 bg-blue-400 px-3 py-1 rounded">Submit</button>
        </form>
      </div>
      {/* Display Account + Match History data if form submitted succesfully. */}
      {Object.keys(matchHistory).length !== 0 && Object.keys(playerData).length !== 0 && (
        <>
          <Account state={playerData} />
          {matchHistory.map((item) => {
            return <Match props={item} /> 
            // item will be object containing match id, game length, and type.
          }
          )
          }
          <button onClick={showMore}>Show More</button>
        </>
      )}
    </div>
  )
}

export default profile