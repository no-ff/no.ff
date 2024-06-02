import React, { useState } from 'react';
import data from '../champ_data.json';

const ManualSearchInput = ({ label, name, value, onChange }) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    // Call onChange that was passed in. The actual event handler is defined in input.js.
    onChange(e);

    const filtered = data.filter(item => {
      const searchItem = searchValue.toLowerCase();
      const fullName = item.champName.toLowerCase();
      return searchItem && fullName.startsWith(searchItem) && fullName !== searchItem;
    });

    setFilteredData(filtered);
  };

  const handleSelect = (item) => {
    onChange({ target: { name, value: item.champName } });
    setFilteredData([]);
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
      {filteredData.length > 0 && (
        <div className="drop-down">
          {/* filteredData array is mapped over and each a div is created for each item. */}
          {/* Each div has an onClick event handler that called handleSelect(), passing in the item (champion name). */}
          {filteredData.map((item) => (
            <div
              onClick={() => handleSelect(item)}
              className='drop-down-item'
              key={item.champName}
            >
              {/* Content of the div will be champion name. */}
              {item.champName} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManualSearchInput;
