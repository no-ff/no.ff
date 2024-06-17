import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import RiotIdInput from './components/input/RiotIdInput';
import Account from './components/Account';
import MatchOuter from './components/MatchOuter';

function profile() {
  const [formData, setFormData] = useState({
    gameName: '',
    tagline: '',
    id: '',
  });
  const [playerData, setPlayerData] = useState({});
  const [matchHistory, setMatchHistory] = useState({});
  const [lockInId, setLockInId] = useState('');
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
    setLockInId(formData.id);
    setMatchHistory({});
    setPlayerData({});
    if (formData.gameName === '' || formData.tagline === '') { alert('Please enter a valid riot id'); return; }
    e.preventDefault();
      // Get account data.
    // console.log(formData) // LOG
    axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
      .then(response => {
        const player_data = response.data;
        setPlayerData(player_data);
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!history.includes(formData.id)) {
          history.push(formData.id);
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
        // Get match history.
        axios.post('http://127.0.0.1:8000/DisplayStats/add_new_matches/', formData)
          .then(response => {
            const matches = response.data['matches'];
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
    const inp_data = { length: matchHistory.length, riotID: formData.id }
    axios.post('http://127.0.0.1:8000/DisplayStats/show_more_matches/', inp_data)
      .then(response => {
        const matches = response.data;
        setMatchHistory([...matchHistory, ...matches['matches']]);
      })
      .catch(error => {
        console.error('There was an error submitting the form !!', error);
      }
      )
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className="center" style={{ paddingTop: '20vh' }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <RiotIdInput
            label={<><span>Riot ID:</span><br /></>}
            name="riotId"
            value={formData.id}
            onChange={handleChange}
          />
          <button
            type="submit"
            whileHover={{
              backgroundColor: "#b89e33", // Change to the color you want
              transition: { duration: 0.2 }
            }}
            className="submit mt-4 px-2 py-1"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Display Account + Match History data if form submitted succesfully. */}
      {Object.keys(matchHistory).length !== 0 && Object.keys(playerData).length !== 0 && (
        <div>
          <Account state={playerData} />
          <div className='flexbox-outer'>
            <div className='side-by-side'></div>
            <div className='account-matches>'>
              {matchHistory.map((item) => {
                return <MatchOuter match={item} player={lockInId} />
              })
              }
              <button onClick={showMore}>Show More</button>
            </div>
            <div className='side-by-side'></div>
          </div>

        </div>
      )}
    </div>
  )
}

export default profile