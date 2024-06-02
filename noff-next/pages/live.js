import React, { useState } from 'react';
import axios from 'axios';
import LiveSearchInput from './components/LiveSearchInput';

function App() {
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
    // Pull name and value fields from the event target, which is the html <input> element. 
    const { name, value } = e.target;
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
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/process-id/', formData)
      .then(response => {
        alert('Form submitted successfully');
        // In this case processedData will just be the percentage.
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
      <h1>Submit Riot ID for Live Game</h1>
      <form onSubmit={handleSubmit}>
        <LiveSearchInput
          label="Riot ID:"
          name="riotId"
          value={formData.id}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
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

export default App;