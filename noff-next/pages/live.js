import React, { useState } from 'react';
import axios from 'axios';
import RiotIdInput from './components/RiotIdInput';

function LiveApp() {
  // useState() is a hook that takes in the initial state and returns an array with two elements.
  // The first element is the current state value and the second element is a function that allows you to update the state.
  const [formData, setFormData] = useState({
    gameName: '',
    tagline: '',
    id: '',
  });
  const [processedData, setProcessedData] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    const findUntil = '#';
    const index = value.indexOf(findUntil);
    if (index !== -1) {
      const gameName = value.substring(0, index);
      const tagline = value.substring(index + 1);
      setFormData({
        gameName: gameName,
        tagline: tagline,
        id: `${gameName}#${tagline}`,
      });
    }
    else {
      setFormData({
        gameName: value,
        tagline: '',
        id: value,
      })
    }
  }

  // Remove duplicates from history.
  const cleanHistory = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const uniqueHistory = [...new Set(history)];
    localStorage.setItem('searchHistory', JSON.stringify(uniqueHistory));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/process-id/', formData)
    // axios.post('http://127.0.0.1:8000/DisplayStats/add_new_matches/', formData)
      .then(response => {
        alert('Form submitted successfully');
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        if (!history.includes(formData.id)) {
          history.push(formData.id);
        }
        localStorage.setItem('searchHistory', JSON.stringify(history));
        setProcessedData(response.data.data);
        setError('');
      })
      .catch(error => {
        alert('Unsuccessful submission');
        console.error('There was an error submitting the form!', error);
        setError('There was an error submitting the form!');
      });
  };

  return (
    <div className="App">
      <h1 className="mb-4">Submit Riot ID for Live Game</h1>
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

      {processedData.length > 0 && (
        <div>
          <h2>Processed Data</h2>
          <table>
          <tr>
            <th>Team</th>
            <th>Top</th>
            <th>Jungle</th>
            <th>Mid</th>
            <th>Bottom</th>
            <th>Support</th>
            <th>Winning Percentage</th>
        </tr>
        <tr>
            <td>Team 1</td>
            <td>{processedData[0]}</td>
            <td>{processedData[1]}</td>
            <td>{processedData[2]}</td>
            <td>{processedData[3]}</td>
            <td>{processedData[4]}</td>
            <td>{processedData[10]}%</td>
        </tr>
        <tr>
            <td>Team 2</td>
            <td>{processedData[5]}</td>
            <td>{processedData[6]}</td>
            <td>{processedData[7]}</td>
            <td>{processedData[8]}</td>
            <td>{processedData[9]}</td>
            <td>{processedData[11]}%</td>
        </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default LiveApp;