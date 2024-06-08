import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import RiotIdInput from './components/RiotIdInput';
import Account from './components/Account';

function profile() {
  const [formData, setFormData] = useState({
    gameName: '',
    tagline: '',
    id: '',
  });
  const [playerData, setPlayerData] = useState({});

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
    console.log(formData);
    axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
      .then(response => {
        const player_data = response.data;
        setPlayerData(player_data);
        printData();
      }
      )
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  }

  const printData = () => {
    console.log(playerData);
  }

  return (
    <div className='search-profile' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1> Enter riot id</h1>
      <form autoComplete="off" onSubmit={submitData}>
        <RiotIdInput
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          label="Riot ID:"
          name="riotId"
          value={formData.id}
          onChange={handleChange}
        />
        <button type='submit' className='mt-4 bg-blue-400 px-3 py-1 rounded'>Search</button>
      </form>
      {/* Display Account + Match History data if form submitted succesfully. */}
      {Object.keys(playerData).length !== 0 && (
        <>
          <Account
            initialState={playerData}
            />
          <div>Test</div>
          {/* Sample structure for match display. */}
          {/* <Match /> */}
          {/* <Match /> */}
        </>
      )}
    </div>
  )
}

export default profile