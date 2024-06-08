import React from 'react'
import { useState } from 'react'
import ProfileLookUp from './components/ProfileLookUp.js'
import axios from 'axios'
function profile() {
    const [formData, modifyformData] = useState({
        gameName: '',
        tagline: '',
    });
    const [playerData, modifyPlayerData] = useState([{}]);
    const submitData = (e) => {
        if (formData.gameName === '' || formData.tagline === '') { alert('Please enter a valid riot id'); return;}
        e.preventDefault();
        console.log(formData);
        axios.post('http://127.0.0.1:8000/DisplayStats/load_player_data/', formData)
        .then(response => {
            const player_data = response.data;
            modifyPlayerData(player_data);
            console.log(playerData);
        }
    )
        .catch(error => {
            console.error('There was an error submitting the form!', error);
        });
    }
    const changeData = (e) => {
        const hash_idx = e.target.value.indexOf('#');
        !(hash_idx === e.target.value.length - 1 || hash_idx === -1 || hash_idx === 0)
        ? modifyformData({
            gameName: e.target.value.substring(0, hash_idx),
            tagline: e.target.value.substring(hash_idx + 1),
        }): modifyformData({
            gameName: '',
            tagline: '',
        });
    }
    const printData = () => {
        console.log(playerData);
    }
  return (
    playerData.length > 0 ?
    <div className='search-profile' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h1> Enter riot id</h1>
        <form onSubmit={submitData} onChange={changeData}>
            <ProfileLookUp/>
            <button type='submit' className='mt-4 bg-blue-400 px-3 py-1 rounded'>Search</button>
        </form>
    </div>
    : <div className='profile-app' style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        {playerData['sumId']},
        {playerData['level']},
        {playerData['icon']},
        {playerData['rank'][0]},
        {playerData['rank'][1]},
        {playerData['rank'][2]},
        {playerData['wr'][0]},
        {playerData['wr'][1]},
        <button type='submit' onClick={printData}>test </button>
    </div>
  )
}

export default profile