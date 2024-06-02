import React, { useState } from 'react';
import axios from 'axios';
import SearchInput from './components/searchInput';  // Import the SearchInput component

function App() {
  const [formData, setFormData] = useState({
    top1: '',
    jungle1: '',
    mid1: '',
    bot1: '',
    supp1: '',
    top2: '',
    jungle2: '',
    mid2: '',
    bot2: '',
    supp2: '',
  });

  const [processedData, setProcessedData] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/process-manual/', formData)
      .then(response => {
        alert('Form submitted successfully');
        setProcessedData(response.data.data);
        setError('');
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        setError('There was an error submitting the form!');
      });
  };

  return (
    <div className="App">
      <h1>Submit Team Data</h1>
      <form onSubmit={handleSubmit}>
        <SearchInput
          label="Team 1 Top:"
          name="top1"
          value={formData.top1}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 1 Jungle:"
          name="jungle1"
          value={formData.jungle1}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 1 Mid:"
          name="mid1"
          value={formData.mid1}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 1 Bot:"
          name="bot1"
          value={formData.bot1}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 1 Supp:"
          name="supp1"
          value={formData.supp1}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 2 Top:"
          name="top2"
          value={formData.top2}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 2 Jungle:"
          name="jungle2"
          value={formData.jungle2}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 2 Mid:"
          name="mid2"
          value={formData.mid2}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 2 Bot:"
          name="bot2"
          value={formData.bot2}
          onChange={handleChange}
        />
        <SearchInput
          label="Team 2 Supp:"
          name="supp2"
          value={formData.supp2}
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