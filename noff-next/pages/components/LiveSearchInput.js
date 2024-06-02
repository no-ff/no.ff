import React, { useState } from 'react';

const LiveSearchInput = ({ label, name, value, onChange }) => {
  const [filteredHistory, setFilteredHistory] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    // Call onChange that was passed in.
    onChange(e);
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const filtered = history.filter(item => {
      const s = searchValue.toLowerCase();
      const t = item.toLowerCase();
      return s && t.startsWith(s) && s !== t;
    });
    setFilteredHistory(filtered);
  }

  const handleSelect = (item) => {
    onChange({ target: { name, value: item } });
    setFilteredHistory([]);
  };

  return (
    // A container that contains the input field and drop-down.
    <div className="search-container">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        // Typing into the input field will call handleSearch.
        // When the handleSearch is called the event object's target will be this input element.
        onChange={handleSearch}
        required
      />
      {filteredHistory.length > 0 && (
        <div className="drop-down">
          {/* filteredHistory array is mapped over and a div is created for each item. */}
          {/* Each div has an onClick event handler called handleSelect(), passing in the item (champion name). */}
          {filteredHistory.map((item) => (
            <div
              onClick={() => handleSelect(item)}
              className="drop-down-item"
              key={item}
            >
              {/* Content of the div will be a Riot ID. */}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSearchInput;
