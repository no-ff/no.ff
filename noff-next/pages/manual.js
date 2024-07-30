import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManualSearchInput from './components/input/ManualSearchInput';
import { motion } from 'framer-motion'

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
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    setWinrate(processedData[10]);
    setKey(prevKey => prevKey + 1);
  }, [processedData[10]]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

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
    const values = Object.values(formData);
    if (new Set(values).size !== values.length) {
      alert('Please enter unique champions for each role!');
      return;
    }
    axios.post('http://127.0.0.1:8000/api/process-manual/', formData)
      .then(response => {
        // alert('Form submitted successfully');
        setProcessedData(response.data.data);
        setError('');
        setShowModal(true);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        alert(error.message);
        setError('There was an error submitting the form!');
      });
  };

  return (
    <div className="App frame">
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex space-x-20">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">TEAM 1</h2>
              <ManualSearchInput
                label="Top:"
                name="top1"
                value={formData.top1}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Jungle:"
                name="jungle1"
                value={formData.jungle1}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Mid:"
                name="mid1"
                value={formData.mid1}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="ADC:"
                name="bot1"
                value={formData.bot1}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Support:"
                name="supp1"
                value={formData.supp1}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">TEAM 2</h2>
              <ManualSearchInput
                label="Top:"
                name="top2"
                value={formData.top2}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Jungle:"
                name="jungle2"
                value={formData.jungle2}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Mid:"
                name="mid2"
                value={formData.mid2}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="ADC:"
                name="bot2"
                value={formData.bot2}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
              <ManualSearchInput
                label="Support:"
                name="supp2"
                value={formData.supp2}
                onChange={handleChange}
                setIsManualAppShifted={setIsManualAppShifted}
              />
            </div>
          </div>
          <motion.button
            type="submit"
            whileHover={{
              backgroundColor: "#b89e33", // Change to the color you want
              transition: { duration: 0.2 }
            }}
            className="submit mt-4 px-2 py-1"
          >
            Submit
          </motion.button>
        </form>
      </div>

      {showModal && processedData.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
        }}>
          <div className="px-10 pt-5 pb-10 bg-gray-900" style={{ borderRadius: '10px'}}>
            <div className="mb-5">
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
                <tr>
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
                <tr>
                  <td className="font-bold py-1">1</td>
                  <td className="py-1">{processedData[0]}</td>
                  <td className="py-1">{processedData[1]}</td>
                  <td className="py-1">{processedData[2]}</td>
                  <td className="py-1">{processedData[3]}</td>
                  <td className="py-1">{processedData[4]}</td>
                  <td className={`py-1 px-2 font-bold manual-app ${processedData[10] > 50 ? 'text-blue-300' : 'text-red-300'}`}>{processedData[10]}%</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">2</td>
                  <td className="py-1">{processedData[5]}</td>
                  <td className="py-1">{processedData[6]}</td>
                  <td className="py-1">{processedData[7]}</td>
                  <td className="py-1">{processedData[8]}</td>
                  <td className="py-1">{processedData[9]}</td>
                  <td className={`py-1 px-2 font-bold manual-app ${processedData[11] > 50 ? 'text-blue-300' : 'text-red-300'}`}>{processedData[11]}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }} onClick={() => setShowModal(false)} />
      )}

    </div>
  );
}

export default ManualApp;