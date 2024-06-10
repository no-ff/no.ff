import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/components/Statistics.module.css';

const RiotIdInput = ({ label, name, value, onChange }) => {
  const [filteredHistory, setFilteredHistory] = useState([]);

  const handleSearch = (e) => {
    onChange(e);
    const searchValue = e.target.value;
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const filtered = history.filter(item => {
      const s = searchValue.toLowerCase();
      const t = item.toLowerCase();
      return s && t.startsWith(s) && s !== t;
    });
    setFilteredHistory(filtered);
  }

  /**
   * When user clicks on the input field.
   */
  const handleSelect = (e) => {
    const searchValue = e.target.value;
    if (!searchValue) { // If nothing has been typed.
      const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
      setFilteredHistory(history);
    }
    else {
      handleSearch(e);
    }
  }

  const handleBlur = () => {
    setFilteredHistory([]);
  }

  /**
   * When user selects a dropdown item.
   */
  const handleClick = (item) => {
    onChange({ target: { value: item } });
    setFilteredHistory([]);
  };

  return (
    // A container that contains the input field and drop-down.
    <div className={`search-container mb-5 relative`}>
      <label htmlFor={name} className='mr-3'>{label}</label>
      <input
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type='text'
        id={name}
        name={name}
        value={value}
        // Typing into the input field will call handleSearch.
        // When the handleSearch is called the event object's target will be this input element.
        onChange={handleSearch}
        onSelect={handleSelect}
        onBlur={handleBlur}
        required
        className='p-1 border rounded w-full'
      />
      {filteredHistory.length > 0 && (
        <div className={`${styles['drop-down']} w-full`}>
          {/* filteredHistory array is mapped over and a div is created for each item. */}
          {filteredHistory.map((item) => (
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseDown={() => handleClick(item)}
              className='border rounded p-1 m-2 text-center'
              key={item}  
            >
              {/* Content of the div will be past searched Riot ID. */}
              {item}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiotIdInput;