import React, { useState, useRef } from 'react';
import Champ from './Champ';
import { color, motion } from 'framer-motion';

var data = require('./champ_data.json');

const ManualSearchInput = ({ label, name, onChange }) => {

  const [filteredData, setFilteredData] = useState(data);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
    onChange(e); // Call onChange that was passed in.
    console.log(searchValue)

    if (searchValue) {
      const filtered = data.filter((item) => {
        const searchItem = searchValue.toLowerCase();
        const fullName = item.champName.toLowerCase();
        return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
      });
      setFilteredData(filtered);
    } 
    else {
      setFilteredData(data);
    }
  };

  // When a user clicks on a champion name, the input field will be set to the champion name.
  const handleSelect = (item) => {
    setInputValue(item.champName);
    onChange({ target: { name, value: item.champName } });
    setFilteredData(data);
    setIsFocused(false);
  };

  // When the input field loses focus, the input value will be cleared.
  const handleBlur = (e) => {
    if (inputRef.current && inputRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Use arrow keys to navigate through the box.
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.min(prevIndex + 12, filteredData.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.max(prevIndex - 12, 0));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.min(prevIndex + 1, filteredData.length - 1));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.max(prevIndex - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect(filteredData[selectedItemIndex]);
        break;
      default:
        break;
    }
  };

  // For champion selection 
  function getClassName(item) {
    let className = 'box-item';
    if (item.champName === filteredData[selectedItemIndex].champName) {
      className += ' selected';
    }
    return className;
  }

  return (
     // A container that contains the input field and box.
    <div className="search-container mb-4" ref={inputRef}>
      <label htmlFor={name}>
        <div className="mb-2">{label}</div>
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue}
        // Typing into the input field will call handleSearch.
        // When the handleSearch is called the event object's target will be this input element.
        onChange={handleSearch}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        required
        className="p-1 border rounded"
      />
      {isFocused && (
        <div className="box">
          {filteredData.map((item) => (
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(item)}
              className={getClassName(item)}
              key={item.champName}
            >
            {/* Content of the div will be champion name. */}
            <Champ name={item.champName} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualSearchInput;