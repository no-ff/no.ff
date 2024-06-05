import React, { useState } from 'react';

const LiveSearchInput = ({ label, name, value, onChange }) => {
  const [filteredHistory, setFilteredHistory] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    onChange(e); // Call onChange that was passed in.
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const filtered = history.filter(item => {
      const s = searchValue.toLowerCase();
      const t = item.toLowerCase();
      return s && t.startsWith(s) && s !== t;
    });
    setFilteredHistory(filtered);
  }

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

  const handleClick = (item) => {
    console.log("called");
    onChange({ target: { name, value: item } });
    setFilteredHistory([]);
  };

  return (
    // A container that contains the input field and drop-down.
    <div className="search-container">
      <label htmlFor={name} className="mr-3">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        // Typing into the input field will call handleSearch.
        // When the handleSearch is called the event object's target will be this input element.
        onChange={handleSearch}
        onSelect={handleSelect}
        onBlur={handleBlur}
        required
        className="p-1 border rounded"
      />
      {filteredHistory.length > 0 && (
        <div className="drop-down">
          {/* filteredHistory array is mapped over and a div is created for each item. */}
          {filteredHistory.map((item) => (
            <div
              onMouseDown={() => handleClick(item)}
              className="drop-down-item"
              key={item}
            >
              {/* Content of the div will be past searched Riot ID. */}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSearchInput;
