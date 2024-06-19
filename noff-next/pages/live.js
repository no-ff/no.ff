import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import RiotIdInput from './components/input/RiotIdInput';
import { motion } from 'framer-motion'

function LiveApp() {
  // useState() is a hook that takes in the initial state and returns an array with two elements.
  // The first element is the current state value and the second element is a function that allows you to update the state.

  const router = useRouter();
  const [formData, setFormData] = useState({
    gameName: '',
    tagline: '',
    id: '', // This field is needed when user selects a dropdown item and content of input needs to be written.
  });
  const [processedData, setProcessedData] = useState([]);
  const [error, setError] = useState('');

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

  const routeSubmit = (e) => {
    e.preventDefault();
    const encoded = formData.id.replace('#', '%23')
    router.push(`/stats/${encoded}`);
  }

  return (
    <div className="App">
      <h1 className="text-1xl mb-5">Get a live game composition prediction.</h1>
      <div>
        <form autoComplete="off" onSubmit={routeSubmit}>
          <RiotIdInput
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            label="Riot ID:"
            name="riotId"
            value={formData.id}
            onChange={handleChange}
          />
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
    </div>
  );
}

export default LiveApp;