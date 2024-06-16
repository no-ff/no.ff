import React, { useState, useRef } from 'react';
import ChampSelect from '../ChampSelect';

var data = require('../champ_data.json');

const ManualSearchInput = ({ label, name, onChange, setIsManualAppShifted }) => {

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

  const handleSelect = (item) => {
    if (item) {
      setInputValue(item.champName);
      onChange({ target: { name, value: item.champName } });
      setFilteredData(data);
      setIsFocused(false);
      setIsManualAppShifted(false);
    }
  };

  const handleBlur = (e) => {
    if (inputRef.current && inputRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsFocused(false);
    setIsManualAppShifted(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsManualAppShifted(true);
  };

  const handleKeyDown = (e) => {
    const windowWidth = window.innerWidth;
    var add = 6;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.min(prevIndex + add, filteredData.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedItemIndex(prevIndex => Math.max(prevIndex - add, 0));
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
    }
  };

  return (
    <div className="search-container flex-auto mb-2" ref={inputRef}>
      <div className="relative">
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
          className="p-1 rounded no-outline"
        />
      </div>
      {isFocused && (
        <ChampSelect filteredData={filteredData} selectedItemIndex={selectedItemIndex} handleSelect={handleSelect} />
      )}
    </div>
  );
};

export default ManualSearchInput;