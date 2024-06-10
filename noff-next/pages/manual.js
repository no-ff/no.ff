import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManualSearchInput from './components/input/ManualSearchInput';

function ManualApp({ setIsManualAppShifted }) {
  
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

  const [winrate, setWinrate] = useState(processedData[10]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setWinrate(processedData[10]);
    setKey(prevKey => prevKey + 1);
  }, [processedData[10]]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
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
        alert(error.message);
        setError('There was an error submitting the form!');
      });
  };

  return (
    <div className="App">
      <h1 className="text-xl font-bold mb-3">Submit Team Data</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex space-x-20">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Team 1</h2>
            <ManualSearchInput
              label="Team 1 Top:"
              name="top1"
              value={formData.top1}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed py-2"
            />
            <ManualSearchInput
              label="Team 1 Jungle:"
              name="jungle1"
              value={formData.jungle1}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed py-2"
            />
            <ManualSearchInput
              label="Team 1 Mid:"
              name="mid1"
              value={formData.mid1}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed py-2"
            />
            <ManualSearchInput
              label="Team 1 Bot:"
              name="bot1"
              value={formData.bot1}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed py-2"
            />
            <ManualSearchInput
              label="Team 1 Supp:"
              name="supp1"
              value={formData.supp1}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed py-2"
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Team 2</h2>
            <ManualSearchInput
              label="Team 2 Top:"
              name="top2"
              value={formData.top2}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed"
            />
            <ManualSearchInput
              label="Team 2 Jungle:"
              name="jungle2"
              value={formData.jungle2}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed"
            />
            <ManualSearchInput
              label="Team 2 Mid:"
              name="mid2"
              value={formData.mid2}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed"
            />
            <ManualSearchInput
              label="Team 2 Bot:"
              name="bot2"
              value={formData.bot2}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed"
            />
            <ManualSearchInput
              label="Team 2 Supp:"
              name="supp2"
              value={formData.supp2}
              onChange={handleChange}
              setIsManualAppShifted={setIsManualAppShifted}
              className="mb-2 fixed"
            />
          </div>
        </div>
        <button type="submit" className="mt-3 bg-blue-400 px-3 py-1 rounded">Submit</button>
      </form>
      
      {processedData.length > 0 && (
        
        <div className="py-8">
          <div className="px-10 py-2 bg-gray-900" style={{ borderRadius: "var(--border-radius)", boxShadow: "0 0 10px rgba(var(--foreground-rgb), 0.1)"}}>
            <div className="mb-3">
              <div className="flex justify-center p-3">
                <h1 className="font-semibold">Team 1 strength against Team 2: </h1>
              </div>
                <div className="winrate-bar">
                  <div key={key} className="winrate-bar-fill flex justify-center items-center" style={{ width: '${processedData[10]}%', '--end-width': `${processedData[10]}%` }}>
                    <span className="text-s text-blue-100 font-mono">{processedData[10]}</span>
                  </div>
                </div>
            </div>
            <table>
              <thead>
              <tr className="flex space-x-4">
                <th className="py-2">Team</th>
                <th className="py-2">Top</th>
                <th className="py-2">Jungle</th>
                <th className="py-2">Mid</th>
                <th className="py-2">Bottom</th>
                <th className="py-2">Support</th>
                <th className="py-2">Win %</th>
              </tr>
              </thead>
              <tbody>
                <tr className="flex space-x-4">
                  <td className="font-bold py-1">1</td>
                  <td className="py-1">{processedData[0]}</td>
                  <td className="py-1">{processedData[1]}</td>
                  <td className="py-1">{processedData[2]}</td>
                  <td className="py-1">{processedData[3]}</td>
                  <td className="py-1">{processedData[4]}</td>
                  <td className="py-1 px-2 font-bold text-blue-300">{processedData[10]}%</td>
                </tr>
                <tr className="flex space-x-4">
                  <td className="font-bold py-1">2</td>
                  <td className="py-1">{processedData[5]}</td>
                  <td className="py-1">{processedData[6]}</td>
                  <td className="py-1">{processedData[7]}</td>
                  <td className="py-1">{processedData[8]}</td>
                  <td className="py-1">{processedData[9]}</td>
                  <td className="py-1 px-2 font-bold text-blue-300">{processedData[11]}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br></br>
        </div>
      )}
      
      </div>
  );
}

export default ManualApp;